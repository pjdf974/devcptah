
onload = function(){

    findAllEcr(critere);
    findAllCod({});
    findAllLb1({});
    findAllLb2({});

    

    //////////////////////////////////////////////////////////// ONCLICK /////////////////////////////////////////////////


    // recherche des écritures selon différents critères
    bfind.onclick = function(){
        critere.find = {};
        if(num.value)
            if(num2.value) critere.find.n = {$gte:parseInt(num.value, 10), $lte:parseInt(num2.value,10)};
            else critere.find.n = parseInt(num.value, 10);
        if(dat.value)
            if(dat2.value) critere.find.d = {$gte:dat.value, $lte:dat2.value};
            else critere.find.d = dat.value;
        if(rec.value){
            var mrec  = parseInt(parseFloat(esp.del(rec.value))*100, 10),
                mrec2 = parseInt(parseFloat(esp.del(rec2.value))*100, 10);
            if(rec2.value) critere.find.m = {$gte:mrec, $lte:mrec2};
            else critere.find.m = mrec;
        };
        if(slt_cod.selectedIndex) critere.find.c = new RegExp(slt_cod.options[slt_cod.selectedIndex].text.substr(0, 1));
        if(typ.value) critere.find.t = new RegExp(typ.value, "i");
        if(lb1.value) critere.find.a = new RegExp(lb1.value, "i");
        if(lb2.value) critere.find.b = new RegExp(lb2.value, "i");
        if(dep.value) critere.find.m = -parseInt(parseFloat(esp.del(dep.value))*100, 10);
        if(tva.value) critere.find.v = parseInt(parseFloat(esp.del(tva.value))*100, 10);
        findAllEcr(critere);
    };

    // tri des écritures affichées dans le select
    tnum.onclick = function(){
        if(critere.sort.n) critere.sort.n = -critere.sort.n;
        else{
            critere.sort = {};
            critere.sort.n = 1;
        };
        findAllEcr(critere);
    };
    tdat.onclick = function(){
        if(critere.sort.d) critere.sort.d = -critere.sort.d;
        else{
            critere.sort = {};
            critere.sort.d = 1;
        };
        findAllEcr(critere);
    };
    ttyp.onclick = function(){
        if(critere.sort.t) critere.sort.t = -critere.sort.t;
        else{
            critere.sort = {};
            critere.sort.t = 1;
        };
        findAllEcr(critere);
    };
    tcod.onclick = function(){
        if(critere.sort.c) critere.sort.c = -critere.sort.c;
        else{
            critere.sort = {};
            critere.sort.c = 1;
        };
        findAllEcr(critere);
    };
    tlb1.onclick = function(){
        if(critere.sort.a) critere.sort.a = -critere.sort.a;
        else{
            critere.sort = {};
            critere.sort.a = 1;
        };
        findAllEcr(critere);
    };
    tlb2.onclick = function(){
        if(critere.sort.b) critere.sort.b = -critere.sort.b;
        else{
            critere.sort = {};
            critere.sort.b = 1;
        };
        findAllEcr(critere);
    };
    trec.onclick = triparmontant;
    tdep.onclick = triparmontant;
    tttc.onclick = triparmontant;
    function triparmontant(){
        if(critere.sort.m) critere.sort.m = -critere.sort.m;
        else{
            critere.sort = {};
            critere.sort.m = 1;
        };
        findAllEcr(critere);
    };
    ttva.onclick = function(){
        if(critere.sort.v) critere.sort.v = -critere.sort.v;
        else{
            critere.sort = {};
            critere.sort.v = 1;
        };
        findAllEcr(critere);
    };
    // fin du tri des écritures affichées dans le select


    // ajouter des critères de recherche d'une écriture
    function ajouterCriteres(){
        num.disabled   = false;
        num2.hidden    = false;
        dat2.hidden    = false;
        rec2.hidden    = false;
        bsave.disabled = true;
        badd.value     = "Cacher les critères";
    };
    function enleverCriteres(){
        num.disabled   = true;
        num2.hidden    = true;
        dat2.hidden    = true;
        rec2.hidden    = true;
        bsave.disabled = false;
        badd.value     = "Ajouter des critères";
    };
    badd.onclick = function(){
        if(num2.hidden){
           ajouterCriteres();
        }else{
           enleverCriteres();
        };
    };



    // sélection d'une écriture dans le select slt_ecr
    // 12345 | jj/mm/aaaa | 12345 | C | AZERTYUIOPMLKJHGFDSQWXCVB | azertyuiopqsdfghjklmwxcvb | 999 999 999.99 | 999 999 999.99 | 99 999 999.99 | 999 999 999.99
    slt_ecr.onclick = function(){
        var ligne = slt_ecr.options[slt_ecr.selectedIndex].text,
            codec = ligne.substr(29, 1); // caractère code
        num.value = esp.pop(ligne.substr(0, 5));
        dat.value = ligne.substr(8, 10);
        typ.value = esp.pop(ligne.substr(21, 5));
        for(var i=0, l=slt_cod.length; i<l; i++){
            if(codec===slt_cod[i].text.substr(0, 1)) slt_cod.selectedIndex = i;
        };
        lb1.value = esp.pop(ligne.substr(33, 25));
        lb2.value = esp.pop(ligne.substr(61, 25)); //123
        var mtva = parseFloat(esp.del(ligne.substr(123, 13))),
            mnt  = parseFloat(esp.del(ligne.substr(139)));
        ht.value = cpta(mnt-mtva);
        if(mnt<0){
            rec.value = "";
            dep.value = cpta(-mnt);
            tva.value = cpta(-mtva);
        }else{
            rec.value = cpta(mnt);
            dep.value = "";
            tva.value = cpta(mtva);
        };
        enleverCriteres();
    };



    // insertion d'une écriture
    bsave.onclick = function(){
        if(dat.value){
            if(num.value) insertEcr(parseInt(esp.del(num.value), 10));
            else insertEcr();
            clearInputs();
        }else{
            addSltEcr("Enregistrement impossible : la saisie de la date est obligatoire.");
        };
    };




    // afficher la gestion des codes
    bcod.onclick = function(){
        if(gescodes.hidden){
            gescodes.hidden = false;
            geslib1.hidden  = true;
            geslib2.hidden  = true;
            bcod.value = "-";
            blb1.value = "+";
            blb2.value = "+";
        }else{
            gescodes.hidden = true;
            bcod.value = "+";
            blb1.value = "+";
            blb2.value = "+";
        };
    };
    // gestion du code --> enregistrement ou modification
    bcodsave.onclick = function(){
        if(cod.value && codlib.value){
            insertCode(cod.value, codlib.value, codid.value);
            cod.value = "";
            codlib.value = "";
            codid.value = "";
        }else{
            addSltEcr("Le code et son libellé doivent être tous les deux saisis.");
        };        
    };
    // sélectionner un code et son libellé dans la select des codes
    slt_cod2.onclick = function(){
        var id = "";
        var ligne = slt_cod2.options[slt_cod2.selectedIndex].text;
        cod.value = ligne.substr(0, 1);
        db.cod.find({c:cod.value}, function(error, result){
            if(error) addSltEcr(error);
            else{
                codid.value = result[0]._id;
                codlib.value = result[0].l;
            };
        });
    };



    // afficher la gestion du 1e libellé
    blb1.onclick = function(){
        if(geslib1.hidden){
            gescodes.hidden = true;
            geslib1.hidden  = false;
            geslib2.hidden  = true;
            geslb1.value    = lb1.value;
            bcod.value = "+";
            blb1.value = "-";
            blb2.value = "+";
        }else{
            geslib1.hidden  = true;
            bcod.value = "+";
            blb1.value = "+";
            blb2.value = "+";
        };
    };
    // gestion du 1e libellé --> enregistrement ou modification
    blb1save.onclick = function(){
        if(geslb1.value){
            insertLibelle1(gesnlb1.value, geslb1.value);
            geslb1.value = "";
            gesnlb1.value = "";
        }else{
            addSltEcr("Il n'y a rien à enregistrer !");
        };
    };
    // sélectionner un libellé 1 dans la select des libellés 1 
    slt_lb12.onclick = function(){
        var ligne = slt_lb12.options[slt_lb12.selectedIndex].text;
        gesnlb1.value = ligne.match(new RegExp("(\\d+)\\s:"))[1];
        var n = ligne.match(new RegExp("\\s\\:\\s\\w+"));
        geslb1.value = ligne.substr(n.index+3);
    };
    
    
    

    // afficher la gestion du 2e libellé 
    blb2.onclick = function(){
        if(geslib2.hidden){
            gescodes.hidden = true;
            geslib1.hidden  = true;
            geslib2.hidden  = false;
            geslb2.value    = lb2.value;
            bcod.value = "+";
            blb1.value = "+";
            blb2.value = "-";
        }else{
            geslib2.hidden  = true;
            bcod.value = "+";
            blb1.value = "+";
            blb2.value = "+";
        };
    };
    // gestion du 2e libellé --> enregistrement ou modification
    blb2save.onclick = function(){
        if(geslb2.value){
            insertLibelle2(gesnlb2.value, geslb2.value);
            geslb2.value = "";
            gesnlb2.value = "";
        }else{
            addSltEcr("Il n'y a rien à enregistrer !");
        };
    };
    // sélectionner un libellé 2 dans la select des libellés 2
    slt_lb22.onclick = function(){
        var ligne = slt_lb22.options[slt_lb22.selectedIndex].text;
        gesnlb2.value = ligne.match(new RegExp("(\\d+)\\s:"))[1];
        var n = ligne.match(new RegExp("\\s\\:\\s\\w+"));
        geslb2.value = ligne.substr(n.index+3);
    };



    // RESET !
    breset.onclick = function(){
        badd.value      = "Ajouter des critères";
        bsave.disabled  = false;
        gescodes.hidden = true;
        geslib1.hidden  = true;
        geslib2.hidden  = true;
        bcod.value = "+";
        blb1.value = "+";
        blb2.value = "+";
        num.disabled    = true;
        num2.hidden     = true;
        dat2.hidden     = true;
        rec2.hidden     = true;
        clearInputs();
        critere = {sort:{n:1}, find:{}};
        findAllEcr(critere);
    };


    // vider les champs de saisie (écritures/codes/libellés)
    bclear.onclick = clearInputs;
    bcodclear.onclick = function(){
        cod.value = "";
        codlib.value = "";
    };
    blb1clear.onclick = function(){
        gesnlb1.value = "";
        geslb1.value = "";
    };
    blb2clear.onclick = function(){
        gesnlb2.value = "";
        geslb2.value = "";
    };



    // ajouter les évènements onfocus set onblur sur les inputs recette, rec2, depense, tva
    function calculHt(event){
        var recette = parseFloat(esp.del(rec.value)) || 0,
            depense = parseFloat(esp.del(dep.value)) || 0,
            mnttva  = parseFloat(esp.del(tva.value)) || 0,
            montant = recette-depense;
        if(montant<0) ht.value = cpta(montant+mnttva);
        else ht.value = cpta(montant-mnttva);
    };
    rec.onfocus = function(){
        rec.value = esp.del(rec.value);
    };
    rec.onblur = function(){
        rec.value = cpta(rec.value);
        calculHt();
    };
    rec2.onfocus = function(){
        rec2.value = esp.del(rec2.value);
    };
    rec2.onblur = function(){
        rec2.value = cpta(rec2.value);
    };
    dep.onfocus = function(){
        dep.value = esp.del(dep.value);
    };
    dep.onblur = function(){
        dep.value = cpta(dep.value);
        calculHt();
    };
    tva.onfocus = function(){
        tva.value = esp.del(tva.value);
    };
    tva.onblur = function(){
        tva.value = cpta(tva.value);
        calculHt();
    };
};

