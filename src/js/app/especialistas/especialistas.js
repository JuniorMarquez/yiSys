
app.controller('InventarioCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster','$timeout',  function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster,$timeout) {
 $scope.nivel=MyService.data.nivel;
  $scope.toaster = {
    

    
    type3: 'info',
    text3: 'El especialista ha sido borrado',
    title3: 'Información',
    
    type4: 'success',
    text4: 'especialista agregado con exito',
    title4: 'Exito',
    
    type5: 'info',
    text5: 'especialista editado con exito',
    title5: 'Información',
    
    type6: 'info',
    text6: 'Estado de preñéz registrado con exito',
    title6: 'Información',
    
    type7: 'warning',
    text7: 'El estado de preñez de este especialista se ha anulado',
    title7: 'Cuidado',

    type8: 'info',
    text8: 'Categoria borrada con exito',
    title8: 'Información',
  };

  $scope.filter = '';
  $scope.mensajePrenez = 'Registrar / anular estado de preñéz del especialista';
    
  $scope.today = function() {
    $scope.fechaNacimiento = new Date();
  };
 

  $scope.clear = function () {
    $scope.fechaNacimiento = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = 'shortDate';

  $scope.carga = function (){
    $http.get('http://localhost:1331/categoria/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
      $scope.categorias = resp.data.results;
    });
  };
$scope.selectCategoria2 = function(item){  
MyService.data.luz=null; 
    MyService.data.categoria=item.categoria;
    angular.forEach($scope.categorias, function(item) {
      item.selected = false;
    });
    $scope.categoria = item;
    // $scope.categoria.selected = true;
    $scope.filter = item.nombres;
    $http.get('http://localhost:1331/especialista/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
      $scope.items = resp.data.results;
      // $scope.item = null;  
      // $scope.item.selected = true;
    });
    $scope.selectItem2(MyService.data.especialista);
  };
$scope.selectItem2 = function(item){  

     $http.get('http://localhost:1331/especialista/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
      $scope.items = resp.data.results;
      // $scope.item = null;  
      // $scope.item.selected = true;
    });
    var identificador =item.id;
        var numero =item.cedula;
        var nombres =item.nombres;
        var apellidos = item.apellidos;
    MyService.data.hembra = nombres;
     MyService.data.numero = numero;
    MyService.data.identificador = identificador;
    angular.forEach($scope.items, function(item) {
      item.selected = true;
      item.editing = false;
    });
    $scope.item = item;
    if (item.sexo == 'Macho'){
      $scope.sexado = true;
    }
    if (item.sexo == 'Hembra'){
      $scope.sexado = false;
    }
     if (item.categoria == 'Vacas'){
      $scope.categoriaValidado = true;
    }
 // if (item.categoria == 'Becerras'){
 //   $scope.alerts = [
 //  { type: 'danger', msg: 'Por su edad, este especialista debería estar en el categoria de las Vacas' }
 //  ];
 //    }




    else{
      $scope.categoriaValidado = false;
    }

    $scope.item.selected = true;
    $http.get('http://localhost:1331/especialista/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
      $scope.especialistas = resp.data.results;
    });
      
    // var pas = item.id;
    // $scope.especialistasFiltrados = $scope.especialistas.filter(function (especialista) {
    //   return (especialista.idespecialista == pas );
    // });

  };
// if ($state=='apps.especialista'){


// };
    if (MyService.data.luz){
        $scope.items = null;
        $scope.item=null;
        // var especialista = MyService.data.especialista;
        // alert("especialista:" +MyService.data.especialista.id);
        $scope.selectGroup2(MyService.data.especialista);
        // $scope.selectItem(especialista);
        MyService.data.luz=null;
        MyService.data.especialista=null;
    };


  // if (!$scope.items){
  //    $scope.items={};
  // };
 
  
  $http.get('http://localhost:1331/categoria/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
    $scope.categorias = resp.data.results;
  });



  // $scope.alerts = [
  // { type: 'danger', msg: 'Por su edad, este especialista debería estar en el categoria de las Vacas' }
  // ];

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.pop2 = function(){
    toaster.pop($scope.toaster.type3, $scope.toaster.title3, $scope.toaster.text3);
  };
  $scope.pop3 = function(){
    toaster.pop($scope.toaster.type4, $scope.toaster.title4, $scope.toaster.text4);
  };
  $scope.pop4 = function(){
    toaster.pop($scope.toaster.type5, $scope.toaster.title5, $scope.toaster.text5);
  };
  $scope.pop8 = function(){
    toaster.pop($scope.toaster.type8, $scope.toaster.title8, $scope.toaster.text8);
  };
  $scope.pop6 = function(){
    if ($scope.item.prenez == true){
      toaster.pop($scope.toaster.type6, $scope.toaster.title6, $scope.toaster.text6);
      }
    if ($scope.item.prenez == false){
      toaster.pop($scope.toaster.type7, $scope.toaster.title7, $scope.toaster.text7);
      }
  };    
  $scope.pop = function(){
    if ($scope.item.estado == true){
      toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
    }
    if ($scope.item.estado == false){
      toaster.pop($scope.toaster.type2, $scope.toaster.title2, $scope.toaster.text2);
    }
  };

  $scope.consultar = function(item){
  MyService.data.especialistaConsultado = null;
  MyService.data.especialistaConsultado = item;
  if (MyService.data.especialistaConsultado.sexo==="Hembra"){
    $state.go('apps.historicoespecialista');
    }
  if (MyService.data.especialistaConsultado.sexo==="Macho"){
    $state.go('apps.historicoespecialistaMacho');
    }
  };
  $scope.carga = function(){
    $http.get('http://localhost:1331/categoria/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
      $scope.categorias = resp.data.results;
    });
  };
  $http.get('http://localhost:1331/departamento/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
      $scope.departamentos = resp.data.results;
    });
 $scope.cargaespecialistas = function(){
      $http.get('http://localhost:1331/especialista/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
        $scope.especialistas = resp.data.results;
      });
    };
    $scope.cargaespecialistas();

  
  $scope.openConfirm = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
        $scope.item = null;  
        $scope.pop2();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
   $scope.openConfirmBorrarEspecialista = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirmBorrarEspecialista.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
        $scope.item = null;  
        $scope.pop2();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openConfirm2 = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm2.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
       $scope.categorias.splice($scope.categorias.indexOf(item), 1);
        $scope.item = null;  
        // $scope.items = null;  
        $scope.pop8();
        
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openDepartamento = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalDepartamento.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openSumDepartamento = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSumDepartamento.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
   $scope.openSumAlimento = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSumAlimento.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openSumMedicamento = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSumMedicamento.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openSalto = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSalto.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openEntradaEspecialista = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalEntradaEspecialista.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
           dato: function () {
          return item;
        },
          items: function () {
            return $scope.items;
          }
        }
      });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
     
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
      
    });

    $scope.calculoExistenciaespecialistas(identificador);
  };
 
  $scope.openSalida = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSalida.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
           dato: function () {
          return item;
        },
          items: function () {
            return $scope.items;
          }
        }
      });
    
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    
    });
    $scope.calculoExistencia(identificador);    
  };
   $scope.openSalidaEspecialista = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalSalidaEspecialista.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
           dato: function () {
          return item;
        },
          items: function () {
            return $scope.items;
          }
        }
      });
    
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    
    });
    $scope.calculoExistenciaespecialistas(identificador);    
  };
  $scope.openParto = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalParto.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
 
$scope.openPeso = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalPeso.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
 


  $scope.disabled = undefined;
  $scope.searchEnabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.enableSearch = function() {
    $scope.searchEnabled = true;
  }

  $scope.disableSearch = function() {
    $scope.searchEnabled = false;
  }

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };

  $scope.createCategoria = function(){
    var categoria = {nombre: 'Nueva categoria'};          
    categoria.nombre = $scope.checkItem(categoria, $scope.categorias, 'nombre');
    categoria.idEstablecimiento = MyService.data.idEstablecimiento;
    categoria.idUsuario = MyService.data.idUsuario;
    $scope.categorias.push(categoria);
  };

  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  $scope.deleteCategoria = function(item){
    $http.delete('http://localhost:1331/categoria/'+item.id , item)
    $scope.categorias.splice($scope.categorias.indexOf(item), 1);
  };

  $scope.selectCategoria = function(item){   
    MyService.data.categoria=item.nombre;
    angular.forEach($scope.categorias, function(item) {
      item.selected = false;
    });
    $scope.categoria = item;
    $scope.categoria.selected = true;
    $scope.filter = item.nombre;
    $http.get('http://localhost:1331/especialista/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
      $scope.items = resp.data.results;
      $scope.item = null;  
      // $scope.item.selected = true;
    });
  };
  $scope.calculoExistencia=function(idespecialista){
    var entradas=0;
    var salidas=0;
    var existencia=0;
    
    $http.get('http://localhost:1331/entrada/?idEspecialista='+idEspecialista).then(function (resp) {
      $scope.entradas=resp.data.results;
      for (var i=0;i<$scope.entradas.length;i++){
        entradas=entradas+$scope.entradas[i].cantidad;
        }
        $http.get('http://localhost:1331/salida/?idEspecialista='+idEspecialista).then(function (resp) {
          $scope.salidas = resp.data.results;
          for (var i=0;i<$scope.salidas.length;i++){
            salidas=salidas+$scope.salidas[i].cantidad;
            }
        existencia = entradas-salidas;   
        $scope.item.existencia=existencia; 
      });
    });    
  };
  $scope.calculoExistenciaespecialistas=function(idEspecialista){
   var entradasespecialistas=0;
    var salidasespecialistas=0;
    var existenciaespecialistas=0;
    
    $http.get('http://localhost:1331/entradaEspecialista/?idEspecialista='+idEspecialista).then(function (resp) {
      $scope.entradasespecialistas=resp.data.results;
      for (var i=0;i<$scope.entradasespecialistas.length;i++){
        entradasespecialistas=entradasespecialistas+$scope.entradasespecialistas[i].cantidad;
        }
        $http.get('http://localhost:1331/salidaEspecialista/?idEspecialista='+idEspecialista).then(function (resp) {
          $scope.salidasespecialistas = resp.data.results;
          for (var i=0;i<$scope.salidasespecialistas.length;i++){
            salidasespecialistas=salidasespecialistas+$scope.salidasespecialistas[i].cantidad;
            }
        existenciaespecialistas = entradasespecialistas-salidasespecialistas;
       var equivalente = existenciaespecialistas/1000;
       equivalente = " g. ( "+equivalente+" Kg.)";

       $scope.item.equivalente = equivalente;
        $scope.item.existenciaespecialistas=existenciaespecialistas; 
      });
    });    
  };


  $scope.validador=function(item){
    var validador=item.stockMinimo*1000;
    $scope.alerts=null;
    if(item.existenciaespecialistas<validador){
      $scope.alerts = [
      { type: 'danger', msg: 'La disponibilidad de este especialista se encuentra por debajo del stock minimo definido' }
      ];
    };
  };

  $scope.selectItem = function(item){    
    $scope.alerts=null;
    var identificador =item.id;
    var numero =item.cedula;
    var nombres =item.nombres;
    var apellidos = item.apellidos;
    MyService.data.hembra = nombres;
    MyService.data.numero = numero;
    MyService.data.identificador = identificador;
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
      });
    $scope.calculoExistenciaespecialistas(identificador);
    $scope.item = item;
    $scope.item.selected = true;
    $http.get('http://localhost:1331/especialista/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
      $scope.especialistas = resp.data.results;
      });
     var pas = item.id;
    $scope.especialistasFiltrados = $scope.especialistas.filter(function (especialista) {
      return (especialista.idEspecialista == pas );
      });
    setTimeout(function() {$scope.validador(item);}, 500);
    
  };

  

  $scope.deleteItem = function(item){
    $http.delete('http://localhost:1331/especialista/'+item.id , item)
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'nombres')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.deleteEspecialista = function(especialista){
    $http.delete('http://localhost:1331/especialista/'+especialista.id , especialista)
    $scope.especialistasFiltrados.splice($scope.especialistas.indexOf(especialista), 1);
    $scope.especialista = $filter('orderBy')($scope.especialistas, 'nombres')[0];
    if($scope.especialista) $scope.especialista.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      mensajeNuevo:"Presione \"Editar\" para ingresar datos",
      idEstablecimiento: MyService.data.idEstablecimiento
    };
    
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
    $scope.item.categoria = MyService.data.categoria;
    $scope.item.mensajeNuevo=null;
    $scope.item.idEstablecimiento = MyService.data.idEstablecimiento;
    $scope.item.idUsuario = MyService.data.idUsuario;
    $http.get('http://localhost:1331/categoria/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
    $scope.categorias = resp.data.results;
    }); 
  };

  $scope.editItem = function(item){
    // alert("holaaa");
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditingCategoria = function(item){
    item.editing = false;
    var categoriaAct= {};
    MyService.data.idenCategoria= item.id;
    categoriaAct.nombre=item.nombre;
    categoriaAct.idEstablecimiento=item.idEstablecimiento;
    categoriaAct.idUsuario=item.idUsuario;
    categoriaAct.idUsuarioAct=MyService.data.idUsuario;
    item.id=null;
    categoriaAct.selected=item.selected;
    categoriaAct.editing=item.editing;
    if (MyService.data.idenCategoria){
      $http.put('http://localhost:1331/categoria/'+MyService.data.idenCategoria, categoriaAct)
    }
    else {
      $http.post('http://localhost:1331/categoria/', categoriaAct)
    }
    // $http.get('http://localhost:1331/categoria/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
    //   $scope.categorias = resp.data.results;
    // });
    $scope.items = null;
    $scope.item = null;
    $scope.especialistas = null;
 
  };

  $scope.sexado =function (item){
    if (item.sexo=='Hembra'){item.avatar='img/cow.png';
      item.control=true;
    } 
    if (item.sexo=='Macho'){item.avatar='img/bull.png';
      item.control=false;
    }

  }
  $scope.doneEditingEspecialista = function(item){
    var especialistaAct = {};
     MyService.data.idenEspecialista=item.id;
    especialistaAct.cedula=item.cedula;
    especialistaAct.nombres=item.nombres;
    especialistaAct.apellidos=item.apellidos;
    especialistaAct.idEstablecimiento=item.idEstablecimiento;
    especialistaAct.categoria=item.categoria;
 especialistaAct.idUsuario=item.idUsuario;
 especialistaAct.departamento=item.departamento;
 especialistaAct.stockMinimo=item.stockMinimo;
   
    

   
    if (MyService.data.idenEspecialista){
      $scope.pop4();
      $http.put('http://localhost:1331/especialista/'+MyService.data.idenEspecialista , especialistaAct)
    }
    else {
      $scope.pop3();;
      $http.post('http://localhost:1331/especialista/', especialistaAct)
    }
    $http.get('http://localhost:1331/categoria/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
      $scope.categorias = resp.data.results;
    });
    $http.get('http://localhost:1331/especialista/?idEstablecimiento='+MyService.data.idEstablecimiento).then(function (resp) {
      $scope.app.states = resp.data.results;
    });
    // $scope.items = null;
    $scope.especialistas = null;
    // $scope.item=null;
    item.editing = false;
  };

}]);
