export const registerFormValidate = (imput) => {

    const errors = {};

    if (!imput.name.trim()){
        errors.name = 'El nombre es requerido';
    }else if (!/^[a-zA-Z-ÁÉÍÓÚáéíóúÑñ\s]+$/.test(imput.name)) {
        errors.name = 'El nombre debe ser válido';
    }
    const dniRegex = /^\d{7,8}$/;

    if (!dniRegex.test(imput.nDni) && !isNaN(imput.nDni) && imput.nDni !== '') {
        errors.nDni = 'El DNI debe contener solo números y tener entre 7 y 8 dígitos.';
    }
   
    if (!imput.birthdate) {
        errors.birthdate = 'La fecha de nacimiento es requerida';
    } else if (new Date(imput.birthdate) > new Date()) {
        errors.birthdate = 'La fecha de nacimiento no puede ser futura';
    } else {
        const birthday = new Date(imput.birthdate);
        const today = new Date();        
        const ageDiffMs = today - birthday;
        const ageDate = new Date(ageDiffMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        if (age < 18) errors.birthdate = 'Debes ser mayor de 18 años para registrarte';           
    }

    if (!imput.email) {
        errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(imput.email)) {
        errors.email = 'El email no es válido';
    }

    if (!imput.username.trim()) {
        errors.username = 'El username es requerido';
    } else if (!/^[a-zA-Z0-9_]+$/.test(imput.username)) {
        errors.username = 'El username solo puede contener letras, números y guiones bajos';
    }
    
    if (!imput.password) {
        errors.password = 'La contraseña es requerida';
    } else {
        if (imput.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(imput.password)) {
            errors.password = 'La contraseña debe tener al menos una mayúscula, una minúscula y un número';
        }
    }
    return errors;
}



export const loginFormValidate = (values) => {
  const errors = {};

  if (!values.username.trim()) {
    errors.username = 'El usuario es requerido';
  }

  if (!values.password) {
    errors.password = 'La contraseña es requerida';
  } else if (values.password.length < 6) {
    errors.password = 'Debe tener al menos 6 caracteres';
  }

  return errors;
};


    


