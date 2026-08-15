//************************************************
//*****************INTERSECTION OBJECT ***********
//************************************************
// function IntersectionObject(_construction, _name, _O1, _O2, _near) {
//     $U.extend(this, new PointObject(_construction, _name, 0, 0)); // Herencia
    
//     var _near = _near;
//     var o1 = _O1;
//     var o2 = _O2;
//     var Cn = _construction;

//     this.setParent(o1, o2);
//     this.setParent(o1, o2, this);
//     this.setFillStyle(2);
//     this.forceFillStyle(2);

//     this.getCode = function() {
//       return "circle_int";
//     };
  
//     this.isMoveable = function() {
//       return false;
//     };

//     this.circle_intersection = function() {
//         // Determine Circle/Circle intersection :
//         var xC1 = o1.getP1().getX(),
//         yC1 = o1.getP1().getY();

//         var xC2 = o2.getP1().getX(),
//         yC2 = o2.getP1().getY();

//         var dx = xC2 - xC1,
//         dy = yC2 - yC1;
//         var r = Math.sqrt(dx * dx + dy * dy);
//         var r1 = o1.getR(),
//         r2 = o2.getR();
//         if (r > (r1 + r2)) {
//             this.setXY(NaN, NaN);
//             return;
//         }
//         if (r === 0) {}
//         var l = (r * r + r1 * r1 - r2 * r2) / (2 * r);
//         dx /= r;
//         dy /= r;
//         var x = xC1 + l * dx,
//         y = yC1 + l * dy;
//         var h = r1 * r1 - l * l;
//         if (h < 0) {
//             this.setXY(NaN, NaN);
//             //p2.setXY(NaN, NaN);
//             return;
//         }
//         h = Math.sqrt(h);
//         if (_near == true)
//             this.setXY(x - h * dy, y + h * dx);
//         else
//             this.setXY(x + h * dy, y - h * dx);
//         o1.checkIfValid(this)
//         o2.checkIfValid(this)
//     };

//     this.line_intersection = function(o1, o2) {
//         NDY = o1.getNDY();
//         NDX = o1.getNDX();

//         var x = o2.getP1().getX(),
//         y = o2.getP1().getY();
//         var r = o2.getR();
//         var d = (x - o1.getP1().getX()) * NDY - (y - o1.getP1().getY()) * NDX;

//         // Si el círculo y la recta son tangentes:
//         if (Math.abs(r - Math.abs(d)) < 1e-12) {
//             var c = o1.projectXY(x, y);
//             this.setXY(c[0], c[1]);
//             return;
//         }

//         x -= d * NDY;
//         y += d * NDX;
//         var h = r * r - d * d;
//         var _xmax, _ymax, _xmin, _xmin;
//         _xmax = Math.max(o1.getXmax(), o1.getXmin());
//         _xmin = Math.min(o1.getXmax(), o1.getXmin());
//         _ymax = Math.max(o1.getYmax(), o1.getYmin());
//         _ymin = Math.min(o1.getYmax(), o1.getYmin());

//         if (h >= 0) {
//             h = Math.sqrt(h);
//             var hDX = h * NDX,
//             hDY = h * NDY;
//             if (_near == true) {
//                 if (x - hDX < _xmin || x -hDX > _xmax || y - hDY < _ymin || y -hDY > _ymax)
//                     this.setXY(NaN, NaN);
//                 else
//                     this.setXY(x - hDX, y - hDY);
//             }
//             else {
//                 if (x + hDX < _xmin || x + hDX > _xmax || y + hDY < _ymin || y + hDY > _ymax)
//                     this.setXY(NaN, NaN);
//                 else
//                     this.setXY(x + hDX, y + hDY);
//             }
//         } else {
//             this.setXY(NaN, NaN);
//         }
//         o1.checkIfValid(this)
//         o2.checkIfValid(this)
//     };

//     this.compute = function() {
//         if (o1.isInstanceType("line")) {
//             this.line_intersection(o1, o2);
//         }
//         else if (o2.isInstanceType("line")) {
//             this.line_intersection(o2, o1);
//         }
//         else {
//             this.circle_intersection();
//         }
//         if (!Cn.getFrame().ifObject(this.getName())) {
//             Cn.getFrame().getTextCons(this);
//           }
//     };
  
//     this.getSource = function(src) {
//       if (this.execMacroSource(src)) return;
//       src.geomWrite(false, this.getName(), "Intersect", o1.getVarName(), o2.getVarName());
//     };
  
//     // MEAG start
//     this.getTextCons = function() {
//       if (this.getParentLength()) {
//         texto = "";
//         texto = this.getName() + $L.object_intersectionpoint_description + this.getParentAt(0).getVarName() + $L.object_intersectionpoint_description_secondObjetc + this.getParentAt(1).getVarName();
//         parents = [o1.getVarName(), o2.getVarName()];
//         return {
//           "texto": texto,
//           "parents": parents
//         };
//       }
//     }
//   };

//************************************************
//*****************INTERSECTION OBJECT ***********
//************************************************
// Path: src/objects/IntersectionObject.js
function IntersectionObject(_construction, _name, _O1, _O2, _near) {
  $U.extend(this, new PointObject(_construction, _name, 0, 0)); // Herencia

  var nearFlag = _near; // true/false: selector discreto entre soluciones
  var o1 = _O1;
  var o2 = _O2;
  var Cn = _construction;

  this.setParent(o1, o2);
  this.setParent(o1, o2, this);
  this.setFillStyle(2);
  this.forceFillStyle(2);

  this.getCode = function () {
    // Mantener compatibilidad
    return "circle_int";
  };

  this.isMoveable = function () {
    return false;
  };

  // ===== Utilidades geométricas en PIXELES =====
  var _segIntersect = function (ax, ay, bx, by, cx, cy, dx, dy) {
    var bax = bx - ax,
      bay = by - ay;
    var dcx = dx - cx,
      dcy = dy - cy;
    var acx = ax - cx,
      acy = ay - cy;
    var den = bax * dcy - bay * dcx;
    if (den === 0) return null; // paralelos/colineales
    var t = (dcx * acy - dcy * acx) / den;
    var u = (bax * acy - bay * acx) / den;
    if (t < 0 || t > 1 || u < 0 || u > 1) return null;
    return { x: ax + t * bax, y: ay + t * bay, t: t, u: u };
  };

  var _segCircleIntersect = function (ax, ay, bx, by, cx, cy, r) {
    // Intersección de segmento AB con círculo (cx,cy,r) en pixeles
    var dx = bx - ax,
      dy = by - ay;
    var fx = ax - cx,
      fy = ay - cy;
    var A = dx * dx + dy * dy;
    var B = 2 * (fx * dx + fy * dy);
    var C = fx * fx + fy * fy - r * r;
    var disc = B * B - 4 * A * C;
    if (disc < 0 || A === 0) return [];
    var sdisc = Math.sqrt(disc);
    var t1 = (-B - sdisc) / (2 * A);
    var t2 = (-B + sdisc) / (2 * A);
    var out = [];
    if (t1 >= 0 && t1 <= 1) out.push({ x: ax + t1 * dx, y: ay + t1 * dy, t: t1 });
    if (disc > 0 && t2 >= 0 && t2 <= 1) out.push({ x: ax + t2 * dx, y: ay + t2 * dy, t: t2 });
    return out;
  };

  var _dedupPix = function (arr, eps) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
      var p = arr[i], keep = true;
      for (var j = 0; j < res.length; j++) {
        var q = res[j];
        var dx = p.x - q.x,
          dy = p.y - q.y;
        if (dx * dx + dy * dy < eps * eps) {
          keep = false;
          break;
        }
      }
      if (keep) res.push(p);
    }
    return res;
  };

  var _getLineScreenSegment = function (line) {
    var P1 = line && (line.P1 || (line.getP1 && line.getP1()) || line.A || (line.getA && line.getA()));
    var P2 = line && (line.P2 || (line.getP2 && line.getP2()) || line.B || (line.getB && line.getB()));
    if (!P1 || !P2 || !P1.getX || !P2.getX) return null;
    var x1 = P1.getX(),
      y1 = P1.getY();
    var x2 = P2.getX(),
      y2 = P2.getY();
    var dx = x2 - x1,
      dy = y2 - y1;
    var len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return null;
    dx /= len;
    dy /= len;
    var b = Cn.getBounds();
    var M = Math.max(b.width, b.height) * 4;
    return [
      { x: x1 - dx * M, y: y1 - dy * M },
      { x: x1 + dx * M, y: y1 + dy * M },
    ];
  };

  var _getFunctionPolyline = function (F) {
    // 1) Preferir API del propio objeto (si fue extendido)
    if (F && typeof F.getPolyline === "function") {
      var poly = F.getPolyline();
      return Array.isArray(poly) ? poly : [];
    }
    // 2) Fallback simple: muestrear E1 sobre el ancho de pantalla (solo cartesianas)
    if (!F || typeof F.getE1 !== "function") return [];
    var E = F.getE1();
    if (!E || (typeof E.isArray === "function" && E.isArray())) return [];
    if (typeof E.value !== "function") return [];
    if (typeof F.compute === "function") F.compute();
    var W = Cn.getBounds().width;
    var out = new Array(Math.max(2, Math.min(2048, W)));
    var step = W / (out.length - 1);
    for (var i = 0; i < out.length; i++) {
      var px = i * step;
      var Xw = Cn.coordsSystem.x(px);
      var Yw = E.value(Xw);
      var py = Cn.coordsSystem.py(Yw);
      out[i] = { x: px, y: py };
    }
    return out;
  };

  var _chooseCandidate = function (cands) {
    if (!cands || cands.length === 0) return null;
    var x0 = this.getX(),
      y0 = this.getY();
    if (!isNaN(x0) && !isNaN(y0)) {
      var best = 0,
        bd = Infinity;
      for (var i = 0; i < cands.length; i++) {
        var dx = cands[i].x - x0,
          dy = cands[i].y - y0,
          d = dx * dx + dy * dy;
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      return cands[best];
    }
    // primera vez: ordenar por x y usar bandera near
    cands.sort(function (a, b) {
      return a.x - b.x;
    });
    return nearFlag ? cands[0] : cands[cands.length - 1];
  }.bind(this);

  // ===== Intersecciones existentes =====
  this.circle_intersection = function () {
    // Circle/Circle (en pixeles)
    var xC1 = o1.getP1().getX(),
      yC1 = o1.getP1().getY();

    var xC2 = o2.getP1().getX(),
      yC2 = o2.getP1().getY();

    var dx = xC2 - xC1,
      dy = yC2 - yC1;
    var r = Math.sqrt(dx * dx + dy * dy);
    var r1 = o1.getR(),
      r2 = o2.getR();
    if (r > r1 + r2) {
      this.setXY(NaN, NaN);
      return;
    }
    if (r === 0) {}
    var l = (r * r + r1 * r1 - r2 * r2) / (2 * r);
    dx /= r;
    dy /= r;
    var x = xC1 + l * dx,
      y = yC1 + l * dy;
    var h = r1 * r1 - l * l;
    if (h < 0) {
      this.setXY(NaN, NaN);
      return;
    }
    h = Math.sqrt(h);
    if (nearFlag === true) this.setXY(x - h * dy, y + h * dx);
    else this.setXY(x + h * dy, y - h * dx);
    o1.checkIfValid(this);
    o2.checkIfValid(this);
  };

  this.line_intersection = function (line, circle) {
    var NDY = line.getNDY();
    var NDX = line.getNDX();

    var x = circle.getP1().getX(),
      y = circle.getP1().getY();
    var r = circle.getR();
    var d = (x - line.getP1().getX()) * NDY - (y - line.getP1().getY()) * NDX;

    if (Math.abs(r - Math.abs(d)) < 1e-12) {
      var c = line.projectXY(x, y);
      this.setXY(c[0], c[1]);
      return;
    }

    x -= d * NDY;
    y += d * NDX;
    var h = r * r - d * d;
    var _xmax,
      _xmin,
      _ymax,
      _ymin;
    _xmax = Math.max(line.getXmax(), line.getXmin());
    _xmin = Math.min(line.getXmax(), line.getXmin());
    _ymax = Math.max(line.getYmax(), line.getYmin());
    _ymin = Math.min(line.getYmax(), line.getYmin());

    if (h >= 0) {
      h = Math.sqrt(h);
      var hDX = h * NDX,
        hDY = h * NDY;
      if (nearFlag === true) {
        if (x - hDX < _xmin || x - hDX > _xmax || y - hDY < _ymin || y - hDY > _ymax)
          this.setXY(NaN, NaN);
        else this.setXY(x - hDX, y - hDY);
      } else {
        if (x + hDX < _xmin || x + hDX > _xmax || y + hDY < _ymin || y + hDY > _ymax)
          this.setXY(NaN, NaN);
        else this.setXY(x + hDX, y + hDY);
      }
    } else {
      this.setXY(NaN, NaN);
    }
    line.checkIfValid(this);
    circle.checkIfValid(this);
  };

  // ===== Nuevas intersecciones con funciones (CurvusObject cartesiano) =====
  var _function_line_candidates = function (F, line) {
    var seg = _getLineScreenSegment(line);
    if (!seg) return [];
    var A = seg[0],
      B = seg[1];
    if (typeof F.compute === "function") F.compute();
    var P = _getFunctionPolyline(F);
    var out = [];
    for (var i = 0; i < P.length - 1; i++) {
      var p0 = P[i],
        p1 = P[i + 1];
      if (isNaN(p0.x) || isNaN(p0.y) || isNaN(p1.x) || isNaN(p1.y)) continue;
      var it = _segIntersect(p0.x, p0.y, p1.x, p1.y, A.x, A.y, B.x, B.y);
      if (it) out.push({ x: it.x, y: it.y });
    }
    return _dedupPix(out, 2.0);
  };

  var _function_circle_candidates = function (F, circle) {
    var cx = circle.getP1().getX(),
      cy = circle.getP1().getY(),
      r = circle.getR();
    if (typeof F.compute === "function") F.compute();
    var P = _getFunctionPolyline(F);
    var out = [];
    for (var i = 0; i < P.length - 1; i++) {
      var p0 = P[i],
        p1 = P[i + 1];
      if (isNaN(p0.x) || isNaN(p0.y) || isNaN(p1.x) || isNaN(p1.y)) continue;
      var its = _segCircleIntersect(p0.x, p0.y, p1.x, p1.y, cx, cy, r);
      for (var k = 0; k < its.length; k++) out.push({ x: its[k].x, y: its[k].y });
    }
    return _dedupPix(out, 2.0);
  };

  var _function_function_candidates = function (F1, F2) {
    if (typeof F1.compute === "function") F1.compute();
    if (typeof F2.compute === "function") F2.compute();
    var P = _getFunctionPolyline(F1);
    var Q = _getFunctionPolyline(F2);
    var out = [];
    // barrido simple por x
    var i = 0,
      j = 0;
    while (i < P.length - 1 && j < Q.length - 1) {
      var p0 = P[i],
        p1 = P[i + 1];
      var q0 = Q[j],
        q1 = Q[j + 1];
      if (
        isNaN(p0.x) ||
        isNaN(p0.y) ||
        isNaN(p1.x) ||
        isNaN(p1.y) ||
        isNaN(q0.x) ||
        isNaN(q0.y) ||
        isNaN(q1.x) ||
        isNaN(q1.y)
      ) {
        if (isNaN(p0.x) || isNaN(p0.y) || isNaN(p1.x) || isNaN(p1.y)) i++;
        if (isNaN(q0.x) || isNaN(q0.y) || isNaN(q1.x) || isNaN(q1.y)) j++;
        continue;
      }
      var pminx = Math.min(p0.x, p1.x),
        pmaxx = Math.max(p0.x, p1.x);
      var qminx = Math.min(q0.x, q1.x),
        qmaxx = Math.max(q0.x, q1.x);
      if (pmaxx < qminx) {
        i++;
        continue;
      }
      if (qmaxx < pminx) {
        j++;
        continue;
      }
      var it = _segIntersect(p0.x, p0.y, p1.x, p1.y, q0.x, q0.y, q1.x, q1.y);
      if (it) out.push({ x: it.x, y: it.y });
      if (pmaxx <= qmaxx) i++;
      else j++;
    }
    return _dedupPix(out, 2.0);
  };

  var _isFunction = function (obj) {
    return obj && typeof obj.isInstanceType === "function" && obj.isInstanceType("function");
  };

  // ====== compute principal ======
  this.compute = function () {
    var f1 = _isFunction(o1);
    var f2 = _isFunction(o2);

    if (f1 && f2) {
      var candsFF = _function_function_candidates(o1, o2);
      var pickFF = _chooseCandidate(candsFF);
      if (pickFF) this.setXY(pickFF.x, pickFF.y);
      else this.setXY(NaN, NaN);
    } else if (f1 && o2.isInstanceType && o2.isInstanceType("line")) {
      var cFL = _function_line_candidates(o1, o2);
      var pFL = _chooseCandidate(cFL);
      if (pFL) this.setXY(pFL.x, pFL.y);
      else this.setXY(NaN, NaN);
    } else if (f2 && o1.isInstanceType && o1.isInstanceType("line")) {
      var cLF = _function_line_candidates(o2, o1);
      var pLF = _chooseCandidate(cLF);
      if (pLF) this.setXY(pLF.x, pLF.y);
      else this.setXY(NaN, NaN);
    } else if (f1 && typeof o2.getR === "function" && typeof o2.getP1 === "function") {
      var cFC = _function_circle_candidates(o1, o2);
      var pFC = _chooseCandidate(cFC);
      if (pFC) this.setXY(pFC.x, pFC.y);
      else this.setXY(NaN, NaN);
    } else if (f2 && typeof o1.getR === "function" && typeof o1.getP1 === "function") {
      var cCF = _function_circle_candidates(o2, o1);
      var pCF = _chooseCandidate(cCF);
      if (pCF) this.setXY(pCF.x, pCF.y);
      else this.setXY(NaN, NaN);
    } else if (o1.isInstanceType && o1.isInstanceType("line")) {
      this.line_intersection(o1, o2);
    } else if (o2.isInstanceType && o2.isInstanceType("line")) {
      this.line_intersection(o2, o1);
    } else {
      this.circle_intersection();
    }

    if (!Cn.getFrame().ifObject(this.getName())) {
      Cn.getFrame().getTextCons(this);
    }

    // Validaciones finales con los padres
    if (o1 && typeof o1.checkIfValid === "function") o1.checkIfValid(this);
    if (o2 && typeof o2.checkIfValid === "function") o2.checkIfValid(this);
  };

  this.getSource = function (src) {
    if (this.execMacroSource(src)) return;
    src.geomWrite(false, this.getName(), "Intersect", o1.getVarName(), o2.getVarName());
  };

  // MEAG start
  this.getTextCons = function () {
    if (this.getParentLength()) {
      var texto = "";
      texto =
        this.getName() +
        $L.object_intersectionpoint_description +
        this.getParentAt(0).getVarName() +
        $L.object_intersectionpoint_description_secondObjetc +
        this.getParentAt(1).getVarName();
      var parents = [o1.getVarName(), o2.getVarName()];
      return { texto: texto, parents: parents };
    }
  };
  // MEAG end
}
