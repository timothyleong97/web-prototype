let p = /-(\d+)DOLLARS/;
let q = /(\d+)%OFF/;
let r = /MINSPEND(\d+)DISCOUNT(\d+)/
let s = /MINSPEND(\d+)PERCENTOFF(\d+)/

const f = (promodetail) => {
    let x = promodetail.match(p);
    if (x != null) {
        return (amount) => Math.max(amount - parseInt(x[1]) , 0);
    }
    x = promodetail.match(q);    
    if (x != null) {
        return (amount) => amount * (100-parseInt(x[1]))/100;
    }    
    x = promodetail.match(r);
    if (x != null) { 
        return (amount) => {
            if (amount >= parseInt(x[1])) {
                return Math.max(amount - parseInt(x[2]), 0)
            } else return amount;
        }
    }    
    x = promodetail.match(s);
    if (x != null) {
        return (amount) => {
            if (amount >= parseInt(x[1])) {
                return amount * (100-parseInt(x[2]))/100;
            } else return amount;
        }
    }
}

export default f;