export default (menu, qty) => {
    let t = [];
    for (let i = 0; i < menu.length; i++) {
      if (qty[i] > 0) {
        t.push([menu[i], qty[i]]);
      }
    }
    return t;
  };