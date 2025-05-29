import styles from './Register.module.css';
import { useFormik } from 'formik';
import { registerFormValidate } from '../../helpers/formValidate';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Register() {

    const formik = useFormik(
        {initialValues: {
            name: '',
            nDni: '',
            birthdate: '',
            email: '',
            username: '',
            password: ''
        },
        initialErrors: {
            name: '',
            nDni: '',
            birthdate: '',
            email: '',
            username: '',
            password: ''
        },    

        validate: registerFormValidate,
        onSubmit: (values) => {
            axios.post('http://localhost:3000/users/register', values)
                .then (res => {
                    if (res.status === 201){
                        Swal.fire({
                            text: 'Usuario registrado correctamente',
                            icon: 'success',                
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);

                    if (err.response.data.error.includes('email')){

                        Swal.fire({
                        icon:'error',
                        title: `Ya existe un usuario con el mail: ${formik.values.email}`
                        })

                    } else if(err.response.data.error.includes ('username')){

                        Swal.fire({
                        icon:'error',
                        title: `Ya existe un usuario con el username: ${formik.values.username}`
                        })

                    } else if(err.response.data.error.includes('nDni')){
                        Swal.fire({
                        icon:'error',
                        title: `Ya existe un usuario con el DNI: ${formik.values.nDni}`
                        })
                    }
                })
        },
            validateOnChange: true, 
            validateOnBlur: true,    
})



    return (
       
        <form className={styles.registerForm} onSubmit={formik.handleSubmit}>

            <h1 className={styles.title}>Formulario de Registro</h1>

            <div>
                <label className={styles.label}>NOMBRE:</label>
                <input className={styles.input} type="text" name="name" placeholder="Ingrese su nombre" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                {formik.errors.name && formik.errors.name ? (
                <label className={styles.error}>{formik.errors.name}</label>) : null}
            </div>
            <div>
                <label className={styles.label}>DNI:</label>
                <input className={styles.input} type="number" name="nDni" placeholder="Ingrese su DNI" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nDni} />
                {formik.errors.nDni && formik.errors.nDni ? (
                <label className={styles.error}>{formik.errors.nDni}</label>) : null}    
            </div>
            <div>
                <label className={styles.label}>FECHA DE NACIMIENTO:</label>
                <input className={styles.input} type="date" name="birthdate" placeholder="Ingrese su fecha de nacimiento" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.birthdate} />
                {formik.errors.birthdate && formik.errors.birthdate ? (  
                <label className={styles.error}>{formik.errors.birthdate}</label>) : null}
            </div>
            <div>
                <label className={styles.label}>EMAIL:</label>
                <input className={styles.input} type="email" name="email" placeholder="Ingrese su email. Ej: mail@mail.com" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                {formik.errors.email && formik.errors.email ? (
                <label className={styles.error}>{formik.errors.email}</label>) : null}
            </div>
            <div>
                <label className={styles.label}>USUARIO:</label>
                <input className={styles.input} type="text" name="username" placeholder="Ingrese su username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username}  />
                {formik.errors.username && formik.errors.username ? (
                <label className={styles.error}>{formik.errors.username}</label>) : null}        
            </div>
            
            <div>
                <label className={styles.label}>CONTRASEÑA:</label>
                <input className={styles.input} type="password" name="password" placeholder="Ingrese su password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}  />
                {formik.errors.password && formik.errors.password ? (
                <label className={styles.error}>{formik.errors.password}</label>) : null}
            </div>

            <button className={styles.button} type="submit" disabled={!(formik.isValid && formik.dirty)} >REGISTRAR</button>
        </form>
      
    );
}