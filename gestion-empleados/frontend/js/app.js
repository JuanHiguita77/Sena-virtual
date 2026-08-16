// Creamos el módulo principal de AngularJS
const app = angular.module('empleadosApp', []);

// Controlador principal
app.controller('EmpleadoController', function ($scope, $http) {

    // URL base de nuestra API REST
    const API_URL = 'http://localhost:3000/api/empleados';

    // Lista de empleados
    $scope.empleados = [];

    // Mensaje para mostrar al usuario
    $scope.mensaje = '';

    // ==========================================
    // OBTENER TODOS LOS EMPLEADOS
    // ==========================================

    $scope.obtenerEmpleados = function () {

        $http.get(API_URL)
            .then(function (response) {

                // Guardamos los empleados recibidos
                $scope.empleados = response.data;

                console.log('Empleados recibidos:', response.data);

            })
            .catch(function (error) {

                console.error('Error al obtener empleados:', error);

                $scope.mensaje = 'Error al conectar con el servidor';

            });
    };

    // Ejecutamos la consulta al iniciar la aplicación
    $scope.obtenerEmpleados();

});