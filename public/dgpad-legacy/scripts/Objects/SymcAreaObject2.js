//************************************************
//*************** symmetric Area OBJECT ****************
//************************************************
function SymcAreaObject(_construction, _name, _V, _P) {
  const Cn = _construction;
  const V = _V;
  const P = _P;
  console.log(P)
  const polRef = [];
  const puntos = P.getPtab();
  for (let i = 0; i < puntos.length; i++) {
    console.log(puntos[i].getName())
    puntos[i].compute()
  }
  const simcPuntos = Cn.getAllObjectsFromType("point");
  const eps = 1e-6;

  for (let i = 0; i < puntos.length; i++) {
    const A = P.getPt(i);
    console.log(A.getName(),A.getx(),A.gety())
    const xSym = 2 * V.getx() - A.getx();
    const ySym = 2 * V.gety() - A.gety();

    let vertice = null;

    for (let j = 0; j < simcPuntos.length; j++) {
      const p = simcPuntos[j];
      console.log("probandoPunto",p.getName())
      console.log(xSym,ySym,p.getx(),p.gety())
      const dx = Math.abs(p.getx() - xSym);
      const dy = Math.abs(p.gety() - ySym);
console.log(dx,dy)
      if (dx < eps && dy < eps) {
        vertice = p;
        console.log("econtróCoincidencia",p.getName())
        break;
      }
    }

    if (!vertice) {
      vertice = new SymcPointObject(Cn, `_P`, V, A);
      console.log("construyóSimetrico",vertice.getName())
      Cn.add(vertice);
    }

    polRef.push(vertice);
    console.log(polRef)
  }

  polRef.push(polRef[0]);

  const a = new AreaObject(Cn, "pol", polRef);
  a.setOpacity(0.2);
  $U.extend(this, a);
console.log(a.getPtab())
  this.setParent(P, V);
  for (let i = 0; i < polRef.length - 1; i++) {
    this.addParent(polRef[i]);
  }

  this.getCode = function () {
    return "area";
  };

  this.isMoveable = function () {
    return false;
  };

  this.compute = function () {
    for (let i = 0; i < puntos.length; i++) {
      if (polRef[i]) polRef[i].compute();
    }
    if (!Cn.getFrame().ifObject(this.getName())) {
      Cn.getFrame().getTextCons(this);
    }
  };

  this.getSource = function (src) {
    src.geomWrite(false, this.getName(), "Symmetry", V.getVarName(), P.getVarName());
  };

  this.getTextCons = function () {
    if (this.getParentLength()) {
      const texto =
        this.getName() +
        $L.object_symc_description_of +
        P.getVarName() +
        $L.object_symc_description_wrto +
        V.getVarName();
      const parents = [P.getVarName(), V.getVarName()];
      return {
        texto,
        parents,
      };
    }
  };
}

