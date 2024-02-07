import { Canvas, CanvasNode } from "src/@types/Canvas"
import { CanvasEvent } from "src/events/events"
import AdvancedCanvasPlugin from "src/main"

export const EXPOSED_DATA = ["type", "isStartNode", "shape"]

export default class NodeDataTaggerCanvasExtension {
  plugin: AdvancedCanvasPlugin

  constructor(plugin: AdvancedCanvasPlugin) {
    this.plugin = plugin

    this.plugin.registerEvent(this.plugin.app.workspace.on(
      CanvasEvent.NodesChanged,
      (_canvas: Canvas, nodes: CanvasNode[]) => {
        for (const node of nodes) {
          const nodeData = node?.unknownData
          if (!nodeData) continue

          for (const dataKey of EXPOSED_DATA) {
            const dataValue = nodeData[dataKey]
            node.nodeEl.dataset[dataKey] = dataValue
          }
        }
      }
    ))
  }
}