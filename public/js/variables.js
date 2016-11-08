var // saisie des écritures
    num       = document.querySelector("#num"),
    num2      = document.querySelector("#num2"),
    dat       = document.querySelector("#dat"),
    dat2      = document.querySelector("#dat2"),
    typ       = document.querySelector("#typ"),
    lb1       = document.querySelector("#lb1"),
    lb2       = document.querySelector("#lb2"),
    rec       = document.querySelector("#rec"),
    rec2      = document.querySelector("#rec2"),
    dep       = document.querySelector("#dep"),
    tva       = document.querySelector("#tva"),
    ht        = document.querySelector("#ht"),

    list_lb1  = document.querySelector("#list_lb1"),
    list_lb2  = document.querySelector("#list_lb2"),

    // bouton + pour faire apparaître la gestion des code et libellés
    bcod      = document.querySelector("#bcod"),   
    blb1      = document.querySelector("#blb1"),   
    blb2      = document.querySelector("#blb2"),   

    // select
    slt_cod   = document.querySelector("#slt_cod"),
    slt_ecr   = document.querySelector("#slt_ecr"),

    // commandes de saisie des écritures
    bsave     = document.querySelector("#bsave"),
    bfind     = document.querySelector("#bfind"),
    bclear    = document.querySelector("#bclear"),
    bprint    = document.querySelector("#bprint"),
    breset    = document.querySelector("#breset"),

    // gestion des codes
    slt_cod2  = document.querySelector("#slt_cod2"), 
    cod       = document.querySelector("#cod"),         
    codlib    = document.querySelector("#codlib"),
    codid     = document.querySelector("#codid"),
    bcodsave  = document.querySelector("#bcodsave"),
    bcodfind  = document.querySelector("#bcodfind"),
    bcodclear = document.querySelector("#bcodclear"),
    gescodes  = document.querySelector(".gescodes")

    // gestion des libellés 1
    slt_lb12  = document.querySelector("#slt_lb12"),        
    geslb1    = document.querySelector("#geslb1"),
    blb1save  = document.querySelector("#blb1save"),
    blb1find  = document.querySelector("#blb1find"),
    blb1clear = document.querySelector("#blb1clear"),
    geslib1   = document.querySelector(".geslib1"),
    gesnlb1   = document.querySelector("#gesnlb1"),

    // gestion des libellés 2
    slt_lb22  = document.querySelector("#slt_lb22"),        
    geslb2    = document.querySelector("#geslb2"),
    blb2save  = document.querySelector("#blb2save"),
    blb2find  = document.querySelector("#blb2find"),
    blb2clear = document.querySelector("#blb2clear"),
    geslib2   = document.querySelector(".geslib2"),
    gesnlb2   = document.querySelector("#gesnlb2"),

    // titres des colonnes la liste des écritures - display --> zone de tri
    tnum      = document.querySelector("#tnum"),
    tdat      = document.querySelector("#tdat"),
    ttyp      = document.querySelector("#ttyp"),
    tcod      = document.querySelector("#tcod"),
    llb1      = document.querySelector("#tlb1"),
    tlb2      = document.querySelector("#tlb2"),
    trec      = document.querySelector("#trec"),
    tdep      = document.querySelector("#tdep"),
    ttva      = document.querySelector("#ttva"),
    tttc      = document.querySelector("#tttc"),
    titrescol = document.querySelectorAll(".titrecol"),  // liste des bouton des titres des colonnes

    // sous-titres de la liste des écritures - display --> ligne de totalisation
    stlib     = document.querySelector("#stlib"),
    strec     = document.querySelector("#strec"),
    stdep     = document.querySelector("#stdep"),
    sttva     = document.querySelector("#sttva"),
    stttc     = document.querySelector("#stttc");

    // variable de programmations
var 
    Nedb      = require("nedb"),
    cpta      = require("pfcpta"),
    esp       = require("pfesp"),
    critere   = { sort: {n:1}, find : {} },
    db        = {},
    database  = "C:/Users/p.fontaine/Desktop/databases/dbcptah.txt",  // base de données de travail - copie du 03/11/2016 de la base réelle située sur m://
    dbtest    = "C:/Users/p.fontaine/Desktop/nw_0174/allscripts/devcptah/datas/ecriturescptah.txt"; // base de test
    
    // initialisation
db.ecr = new Nedb({filename:dbtest, autoload:true});  
db.cod = new Nedb({filename:process.cwd()+"/datas/codescptah.txt", autoload:true});
db.lb1 = new Nedb({filename:process.cwd()+"/datas/libelles1cptah.txt", autoload:true});
db.lb2 = new Nedb({filename:process.cwd()+"/datas/libelles2cptah.txt", autoload:true});

db.ecr.ensureIndex({fieldName:"n", unique:true});
db.cod.ensureIndex({fieldName:"c", unique:true});
db.lb1.ensureIndex({fieldName:"n", unique:true});
db.lb2.ensureIndex({fieldName:"n", unique:true});