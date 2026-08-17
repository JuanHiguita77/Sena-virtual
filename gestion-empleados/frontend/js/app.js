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

        // Validar datos antes de enviar al backend
        const errorValidacion =
            $scope.validarEmpleado($scope.nuevoEmpleado);
    
        if (errorValidacion) {
    
            $scope.mensaje = errorValidacion;
            $scope.tipoMensaje = 'error';
    
            return;
        }
    
        $http.post(API_URL, $scope.nuevoEmpleado)
            .then(function (response) {
    
                console.log('Empleado creado:', response.data);
    
                $scope.empleados.push(response.data);
    
                // Limpiar formulario
                $scope.nuevoEmpleado = {
                    name: '',
                    position: '',
                    office: '',
                    salary: null
                };
    
                $scope.mensaje =
                    'Empleado registrado correctamente';
    
                $scope.tipoMensaje = 'success';
    
            })
            .catch(function (error) {
    
                console.error('Error al crear empleado:', error);
    
                $scope.mensaje =
                    error.data?.message ||
                    'No fue posible registrar el empleado';
    
                $scope.tipoMensaje = 'error';
    
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

        // Validar datos antes de enviar al backend
        const errorValidacion =
            $scope.validarEmpleado($scope.empleadoEditado);
    
        if (errorValidacion) {
    
            $scope.mensaje = errorValidacion;
            $scope.tipoMensaje = 'error';
    
            return;
        }
    
        $http.put(
            API_URL + '/' + $scope.empleadoEditado._id,
            $scope.empleadoEditado
        )
        .then(function (response) {
    
            console.log(
                'Empleado actualizado:',
                response.data
            );
    
            // Actualizar la lista
            $scope.obtenerEmpleados();
    
            $scope.mensaje =
                'Empleado actualizado correctamente';
    
            $scope.tipoMensaje = 'success';
    
            $scope.editando = false;
    
            $scope.empleadoEditado = {};
    
        })
        .catch(function (error) {
    
            console.error(
                'Error al actualizar:',
                error
            );
    
            $scope.mensaje =
                error.data?.message ||
                'No fue posible actualizar el empleado';
    
            $scope.tipoMensaje = 'error';
    
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

    // ==========================================
    // VALIDAR DATOS DEL EMPLEADO
    // ==========================================

    $scope.validarEmpleado = function (empleado) {

        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        // Validar nombre
        if (!empleado.name || !empleado.name.trim()) {
            return 'El nombre es obligatorio';
        }

        if (!soloLetras.test(empleado.name.trim())) {
            return 'El nombre solo puede contener letras y espacios';
        }

        // Validar cargo
        if (!empleado.position || !empleado.position.trim()) {
            return 'El cargo es obligatorio';
        }

        if (!soloLetras.test(empleado.position.trim())) {
            return 'El cargo solo puede contener letras y espacios';
        }

        // Validar oficina
        if (!empleado.office || !empleado.office.trim()) {
            return 'La oficina es obligatoria';
        }

        if (!soloLetras.test(empleado.office.trim())) {
            return 'La oficina solo puede contener letras y espacios';
        }

        // Validar salario
        if (
            empleado.salary === null ||
            empleado.salary === undefined ||
            empleado.salary === ''
        ) {
            return 'El salario es obligatorio';
        }

        if (isNaN(empleado.salary)) {
            return 'El salario debe ser un número';
        }

        if (Number(empleado.salary) < 0) {
            return 'El salario no puede ser negativo';
        }

        return null;
    };

});