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
    
    // Objeto que almacenará los datos del nuevo empleado
    $scope.nuevoEmpleado = {
        name: '',
        position: '',
        office: '',
        salary: null
    };

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

    // ==========================================
    // CREAR EMPLEADO
    // ==========================================

    $scope.crearEmpleado = function () {

        $http.post(API_URL, $scope.nuevoEmpleado)
            .then(function (response) {

                console.log('Empleado creado:', response.data);

                // Mostrar el nuevo empleado inmediatamente
                $scope.empleados.push(response.data);

                // Limpiar formulario
                $scope.nuevoEmpleado = {
                    name: '',
                    position: '',
                    office: '',
                    salary: null
                };

                $scope.mensaje = 'Empleado registrado correctamente';

            })
            .catch(function (error) {

                console.error('Error al crear empleado:', error);

                $scope.mensaje =
                    error.data?.message ||
                    'No fue posible registrar el empleado';

            });
    };

    // ==========================================
    // CARGAR EMPLEADO PARA EDITAR
    // ==========================================

    $scope.editarEmpleado = function (empleado) {

        // Copiamos el empleado para no modificar
        // directamente el objeto de la tabla
        $scope.empleadoEditado = angular.copy(empleado);

        $scope.editando = true;

    };

    // Indica si estamos editando un empleado
    $scope.editando = false;

    // Empleado que se está editando
    $scope.empleadoEditado = {};

    // ==========================================
    // ACTUALIZAR EMPLEADO
    // ==========================================

    $scope.actualizarEmpleado = function () {

        $http.put(
            API_URL + '/' + $scope.empleadoEditado._id,
            $scope.empleadoEditado
        )
        .then(function (response) {

            console.log('Empleado actualizado:', response.data);

            // Volvemos a consultar los empleados
            // para mostrar la información actualizada
            $scope.obtenerEmpleados();

            $scope.mensaje = 'Empleado actualizado correctamente';

            // Salimos del modo edición
            $scope.editando = false;

            $scope.empleadoEditado = {};

        })
        .catch(function (error) {

            console.error('Error al actualizar:', error);

            $scope.mensaje =
                error.data?.message ||
                'No fue posible actualizar el empleado';

        });
    };

    // ==========================================
    // CANCELAR EDICIÓN
    // ==========================================

    $scope.cancelarEdicion = function () {

        $scope.editando = false;

        $scope.empleadoEditado = {};

    };

    // ==========================================
    // ELIMINAR EMPLEADO
    // ==========================================

    $scope.eliminarEmpleado = function (empleado) {

        const confirmar = confirm(
            '¿Está seguro de eliminar a ' + empleado.name + '?'
        );

        if (!confirmar) {
            return;
        }

        $http.delete(
            API_URL + '/' + empleado._id
        )
        .then(function (response) {

            console.log('Empleado eliminado:', response.data);

            // Volvemos a cargar la lista
            $scope.obtenerEmpleados();

            $scope.mensaje = 'Empleado eliminado correctamente';

        })
        .catch(function (error) {

            console.error('Error al eliminar:', error);

            $scope.mensaje =
                error.data?.message ||
                'No fue posible eliminar el empleado';

        });
    };
});