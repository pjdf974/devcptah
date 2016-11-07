
// ajouter un ligne unique dans le select des écritures -- affichage des erreurs
function addSltEcr(texte){
    slt_ecr.length = 0;
    slt_ecr.add(new Option(texte));
};


// recherche des écritures
function findAllEcr(critere){
    db.ecr.find(critere.find).sort(critere.sort).exec(function(error, result){
        if(error) addSltEcr(error);
        else{
            slt_ecr.length = 0;
            var totalrec = 0,
                totaldep = 0,
                totaltva = 0,
                totalttc = 0,
                nbr      = 0,
                mtva     = 0;
            result.forEach(function(item){
                var mrec = 0, 
                    mdep = 0;
                if(item.m<0){
                    mdep = item.m+(item.v || 0);
                    mtva = -item.v || 0;
                }else{
                    mrec = item.m-(item.v || 0);
                    mtva = item.v || 0;
                };
                totaltva += mtva;
                totalttc += item.m;
                totalrec += mrec;
                totaldep += mdep;
                nbr++;
                slt_ecr.add(new Option(
                    esp.lim(item.n, 5, false)+" | "+
                    esp.lim(item.d, 10)+" | "+
                    esp.lim(item.t, 5)+" | "+
                    esp.lim(item.c, 1)+" | "+
                    esp.lim(item.a, 25)+" | "+
                    esp.lim(item.b, 25)+" | "+
                    esp.lim(cpta(mrec/100), 14, false)+" | "+
                    esp.lim(cpta(mdep/100), 14, false)+" | "+
                    esp.lim(cpta(mtva/100 || 0), 13, false)+" | "+
                    esp.lim(cpta(item.m/100), 14, false)
                ));
            });
            slt_ecr.selectedIndex = slt_ecr.length-1;
            stlib.value = nbr+" écriture(s) trouvée(s)";
            strec.value = cpta(totalrec/100);
            stdep.value = cpta(totaldep/100);
            sttva.value = cpta(totaltva/100);
            stttc.value = cpta(totalttc/100);
        };
    });        
};


// rechercher des codes+libellés du code
function findAllCod(critere){
    db.cod.find(critere).sort({c:1}).exec(function(error, result){
        if(error) addSltEcr(error);
        else{
            slt_cod.length = 0;
            slt_cod2.length = 0;
            slt_cod.add(new Option(""));
            result.forEach(function(item){
                slt_cod.add(new Option(item.c+" "+item.l));
                slt_cod2.add(new Option(item.c+" "+item.l));
            });
            slt_cod2.selectedIndex = slt_cod2.length-1;
        };
    });
};


// recherche des libellés 1
function findAllLb1(critere){
    db.lb1.find(critere).sort({l:1}).exec(function(error, result){
        if(error) addSltEcr(error);
        else{
            clearDatalist(list_lb1);
            addDatalist(list_lb1, result);
            addSltLib(slt_lb12, result);
        };
    });
};


// recherche des libellés 2
function findAllLb2(critere){
    db.lb2.find(critere).sort({l:1}).exec(function(error, result){
        if(error) addSltEcr(error);
        else{
            clearDatalist(list_lb2);
            addDatalist(list_lb2, result);
            addSltLib(slt_lb22, result);
        };
    });
};



// insérer une écriture
function insertEcr(numero){
    var recette = parseInt(parseFloat(esp.del(rec.value))*100, 10) || 0,
        depense = parseInt(parseFloat(esp.del(dep.value))*100, 10) || 0,
        montant = recette-depense;
    var ecriture = {
        d: dat.value,
        t: typ.value || "",
        c: slt_cod.options[slt_cod.selectedIndex].text.substr(0, 1) || "",
        a: lb1.value || "",
        b: lb2.value || "",
        m: montant,
        v: parseInt(parseFloat(esp.del(tva.value))*100, 10) || 0
    };
    if(numero){
        ecriture.n = numero;
        db.ecr.update({n:numero}, ecriture, function(error){
            if(error) addSltEcr(error);
            else findAllEcr(critere);
        });
    }else{
        db.ecr.count({}, function(error, nbr){
            if(error) addSltEcr(error);
            else{
                ecriture.n = nbr+1;
                db.ecr.insert(ecriture, function(error){
                    if(error) addSltEcr(error);
                    else findAllEcr(critere);
                });
            };
        });
    };
};



// insérer un code+libellé du code
function insertCode(code, libelle, id){
    if(id){
        db.cod.update({_id:id}, {c:code, l:libelle}, function(error){
            if(error) addSltEcr(error);
            else findAllCod({});
        });
    }else{
        db.cod.insert({c:code, l:libelle}, function(error, result){
            if(error) addSltEcr(error);
            else findAllCod({});
        });
    };
};


// insérer un libellé 1
function insertLibelle1(numero, libelle){
    if(numero){
        db.lb1.update({n:parseInt(numero, 10)}, {$set:{l:libelle}}, function(error){
            if(error) addSltEcr(error);
            else findAllLb1({});
        })
    }else{
        db.lb1.count({}, function(error, nbr){
             if(error) addSltEcr(error);
             else{
                db.lb1.insert({n:nbr+1, l:libelle}, function(error, result){
                    if(error) addSltEcr(error);
                    else findAllLb1({});
                });
            };
        });
    };
};


// insérer un libellé 2
function insertLibelle2(numero, libelle){
    if(numero){
        db.lb2.update({n:parseInt(numero, 10)}, {$set:{l:libelle}}, function(error){
            if(error) addSltEcr(error);
            else findAllLb2({});
        })
    }else{
        db.lb2.count({}, function(error, nbr){
             if(error) addSltEcr(error);
             else{
                 db.lb2.insert({n:nbr+1, l:libelle}, function(error, result){
                    if(error) addSltEcr(error);
                    else findAllLb2({});
                });
             };
        });
    };
};


// ajouter des options aux datalistes
function addDatalist(datalist, liste){
    liste.forEach(function(item){
        var option = document.createElement("option");
        option.value = item.l;
        datalist.appendChild(option);
    });
};
// effacer toutes les options des datalistes
function clearDatalist(datalist){
    var childrens = datalist.children;
    while(childrens.length>0){
        datalist.removeChild(childrens[0]);
        childrens = datalist.children;
    };
};


// mettre à jour les selects des libellés 1 et 2
function addSltLib(select, liste){
    select.length = 0;
    liste.forEach(function(item){
        select.add(new Option(item.n+" : "+item.l));
    });
    select.selectedIndex = select.length-1;
};


// vider les champs de la saisie d'un écriture
function clearInputs(){
    num.value  = "";
    num2.value = "";
    dat.value  = "";
    dat2.value = "";
    typ.value  = "";
    lb1.value  = "";
    lb2.value  = "";
    rec.value  = "";
    rec2.value = "";
    dep.value  = "";
    tva.value  = "";
    ht.value  = "";

    slt_cod.selectedIndex = 0;
};