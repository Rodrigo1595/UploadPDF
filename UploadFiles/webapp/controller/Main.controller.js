sap.ui.define([
        "sap/ui/core/mvc/Controller",
        'sap/m/MessageToast',
        "sap/ui/model/json/JSONModel"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,MessageToast,JSONModel) {
		"use strict";

		return Controller.extend("UploadFiles.UploadFiles.controller.Main", {
			onInit: function () {
                this.resetoData()                 
            },

            onUploadPress: async function(oEvent) {
            this.resetoData()
			var oModel = this.getView().getModel("imagesModel");
			var oData = oModel.getData();
			var f = oEvent.oSource.oFileUpload.files[0];
            var Path = URL.createObjectURL(f);
     
            var reader = new FileReader();
            reader.readAsDataURL(f)
            reader.onloadend = function(){
                var obj = {
					"Name": f.name,
                    "Path": Path,
                    "Base64":reader.result
			        };
                oModel.setData(obj);
                //replace(/^data:.+;base64,/, ''); quita data:application...;base64,/
            };
			
        },

        onPressButton: function(){
            let oModel = this.getView().getModel('imagesModel')
            //Abre sin problemas
            window.open(oModel.getProperty('/Path'));

            //https://ourcodeworld.com/articles/read/682/what-does-the-not-allowed-to-navigate-top-frame-to-data-url-javascript-exception-means-in-google-chrome
            //"Not allowed to navigate top frame to data URL" 
            //No se pueden insertar elementos en navegacion de maneradirecta en base64 desde el 2018 en los navegadores tradicionales
            //window.open(encodeURI(oModel.getProperty('/Base64'))); <-- Antes servia , ahora no de manera directa , uno manualmente debe apretar enter.

            // Workaround , abrir el pdf construyendo un iFrame.
            var Base64Window = window.open();
            Base64Window.document.write('<iframe src="' + oModel.getProperty('/Base64') + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
        },

         resetoData:function(){                    
            var oModel = new JSONModel();
			this.getView().setModel(oModel, "imagesModel");
       } 
     

		});
    });
    
    // USANDO READER.ONLOAD 

    // let Base64Blob = this.Base64(f) ;
    //     Base64: async function(file){
    //         let blob = new Blob([file], { type: "text/plain" });
    //         var reader = new FileReader();
    //         await new Promise((resolve, reject) => {
    //         reader.onload = resolve;
    //         reader.onerror = reject;
    //         reader.readAsDataURL(file);
    //         });
    //         let base64hecho = reader.result
    //         return  base64hecho
            
    //    },
