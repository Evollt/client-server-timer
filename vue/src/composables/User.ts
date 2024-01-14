import { useAuthStore } from "@/store/auth";
import { ILogin } from "@/types/Login";
import { IRegister } from "@/types/Register";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export class User {
  protected static authStore = () => useAuthStore()
  public static create(formData: ILogin) {
    axios.post('api/user/login', {
      email: formData.email,
      password: formData.password
    }).then(response => {
      this.authStore().user = response.data.user
      // useCookie('token').value = response.data.token
      document.cookie = `jwt_token=${response.data.authorisation.token}`

      window.location.href = '/'

    }).catch(e => {
      Object.keys(e.response?.data?.errors).forEach(key => {
        toast.error(e.response?.data?.errors[key][0])
      })
    })
  }

  public static register(formData: IRegister) {
    axios.post('api/user/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }).then(response => {
      this.authStore().user = response.data.user

      document.cookie = `jwt_token=${response.data.authorisation.token}`

      window.location.href = '/'
    }).catch(e => {
      Object.keys(e.response?.data?.errors).forEach(key => {
        toast.error(e.response?.data?.errors[key][0])
      })
    })
  }
}
