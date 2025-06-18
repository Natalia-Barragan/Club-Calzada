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

// const isTimeValid = (time) => {
//     const [hours, minute] = time.split(':').map(Number);
//     const totalMinutes = hours * 60 + minute;
//     const startTime = 14 * 60; // 14:00
//     const endTime = 23 * 60;
//     return totalMinutes >= startTime && totalMinutes <= endTime;

// };

// export const dateTimeValidate = (inputs) => {
//   const errors = {};
//   const { date, time } = inputs;
//     const selectedDateTime = new Date(`${date}T${time}`);
//     const now = new Date();
//     const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

//     if (!date) {
//     errors.date = "La fecha es obligatoria";
//     } else if (selectedDateTime < now) {
//     errors.date = "No puedes seleccionar una fecha pasada";
//     } else if (selectedDateTime < twentyFourHoursLater) {
//     errors.date = "Debes seleccionar una fecha con al menos 24 horas de anticipación";
//     } else if (
//     selectedDateTime.getDay() === 0 ||
//     selectedDateTime.getDay() === 6    
//     ) {
//     errors.date = "No se pueden agendar turnos los fines de semana";
//     }

//     if (!time) {
//     errors.time = "La hora es obligatoria";
//     } else if (!isTimeValid(time)) {
//     errors.time = "La hora debe estar entre las 14 PM y las 23 PM";
//     }

//     return errors;

// }


const isTimeValid = (time) => {
  const [hours, minute] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minute;
  const startTime = 14 * 60; 
  const endTime = 23 * 60; 

  return totalMinutes >= startTime && totalMinutes <= endTime;
};

export const dateTimeValidate = (inputs) => {
  const errors = {};
  const { date, time } = inputs;
  const selectedDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // Validaciones para la fecha
  if (!date) {
    errors.date = "La fecha es obligatoria";
  } else if (selectedDateTime < now) {
    errors.date = "No puedes seleccionar una fecha pasada";
  } else if (selectedDateTime < twentyFourHoursLater) {
    errors.date = "Debes seleccionar una fecha con al menos 24 horas de anticipación";
  } else if (selectedDateTime.getDay() === 0 || selectedDateTime.getDay() === 6) {
    errors.date = "No se pueden agendar turnos los fines de semana";
  }

  if (!time) {
    errors.time = "La hora es obligatoria";
  } else {
    const [, minutes] = time.split(':').map(Number);

    if (minutes !== 0) {
      errors.time = "Solo se permiten turnos en punto (ej: 15:00, 17:00)";
    } else if (!isTimeValid(time)) {
      errors.time = "La hora debe estar entre las 14:00 y las 23:00";
    }
  }

  return errors;
};

    


