import { Construction } from '../construction/construction';
import { SourceWriter } from '../core/source-writer';
import { PointObject } from '../objects/point-object';
import { PrimitiveCircleObject } from '../objects/primitive-circle-object';
import { PrimitiveLineObject } from '../objects/primitive-line-object';
import { SegmentObject } from '../objects/segment-object';

export interface ExportConfig {
  hideCtrlPanel?: boolean;
  fixWidgets?: boolean;
  fixDgScripts?: boolean;
  disableZoom?: boolean;
  local?: boolean;
  version?: boolean;
}

/**
 * Generador de exportaciones para construcciones de DGPad en múltiples formatos.
 * Migrado desde ExportPanel.js y svgcanvas.js
 */
export class EngineExporter {
  private construction: Construction;

  constructor(construction: Construction) {
    this.construction = construction;
  }

  exportText(_config?: ExportConfig): string {
    const sw = new SourceWriter({
      getVarName: (name) => name.toLowerCase().replace(/[^\w]/g, ''),
    });

    for (const obj of this.construction.elements()) {
      if (obj instanceof PointObject && obj.free()) {
        sw.geomWrite(false, obj.getName(), 'Point', obj.getX(), obj.getY());
      } else if (obj instanceof SegmentObject) {
        sw.geomWrite(false, obj.getName(), 'Segment', obj.getP1().getName(), obj.getP2().getName());
      }
    }

    return sw.getSource();
  }

  exportHtml(config?: ExportConfig): string {
    const source = this.exportText(config);
    return `<div class="dgpad-canvas" data-source="${encodeURIComponent(source)}"></div>`;
  }

  exportHtmlJs(config?: ExportConfig): string {
    const source = this.exportText(config);
    return `<script type="text/javascript">
window.addEventListener('load', function() {
  var data = "${encodeURIComponent(source)}";
  // DGPad initialization script
});
</script>`;
  }

  exportResponsive(config?: ExportConfig): string {
    const html = this.exportHtmlJs(config);
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>DGPad Export</title>
  <style>
    html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
  }

  exportSvg(width = 800, height = 600): string {
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n`;
    svgContent += `  <rect width="100%" height="100%" fill="#F8F8F8" />\n`;

    for (const obj of this.construction.elements()) {
      if (!obj.isVisible()) continue;

      if (obj instanceof PointObject) {
        svgContent += `  <circle cx="${obj.getX()}" cy="${obj.getY()}" r="${obj.getSize()}" fill="${obj.getColor().getRGBA()}" />\n`;
        if (obj.isShowName() && obj.getName()) {
          svgContent += `  <text x="${obj.getX() + 8}" y="${obj.getY() - 8}" font-family="Verdana" font-size="${obj.getFontSize()}" fill="${obj.getColor().getRGBA()}">${obj.getName()}</text>\n`;
        }
      } else if (obj instanceof SegmentObject) {
        svgContent += `  <line x1="${obj.getP1().getX()}" y1="${obj.getP1().getY()}" x2="${obj.getP2().getX()}" y2="${obj.getP2().getY()}" stroke="${obj.getColor().getRGBA()}" stroke-width="${obj.getSize()}" />\n`;
      } else if (obj instanceof PrimitiveCircleObject) {
        svgContent += `  <circle cx="${obj.getP1().getX()}" cy="${obj.getP1().getY()}" r="${obj.getR()}" fill="none" stroke="${obj.getColor().getRGBA()}" stroke-width="${obj.getSize()}" />\n`;
      }
    }

    svgContent += `</svg>`;
    return svgContent;
  }
}
