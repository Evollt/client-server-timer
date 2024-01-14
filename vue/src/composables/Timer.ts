import { useAuthStore } from "@/store/auth";
import { useTimersStore } from "@/store/timers";
import axios from "axios";
import { VueCookies } from "vue-cookies";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export class Timer {
  protected static timersStore = () => useTimersStore()
  protected static authStore = () => useAuthStore()

  public static create(timer: any, cookies: VueCookies | undefined) {
    axios
      .post(
        "api/timer/create",
        {
          title: timer.title,
          time: `${timer.hour}:${timer.minute}:${timer.second}`
        },
        {
          headers: {
            // @ts-ignore
            Authorization: `Bearer ${cookies.get("jwt_token")}`,
          },
        }
      )
      .then(() => {
        toast.success("Таймер создан");
      })
      .catch((e) => {
        Object.keys(e.response?.data?.errors).forEach((key) => {
          toast.error(e.response?.data?.errors[key][0]);
        });
      });
  }

  public static delete(id: string | number | undefined, cookies: VueCookies | undefined) {
    axios.delete('api/timer/delete/' + id, {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${cookies.get("jwt_token")}`,
      },
    }).then(() => {
      this.timersStore().timers = this.timersStore().timers.filter(item => item.id != id)
      toast.error("Таймер удален");
    })
  }

  public static getAll(cookies: VueCookies | undefined) {
    axios.get('api/timer/getAll', {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${cookies.get('jwt_token')}`,
      }
    }).then(response => {
      this.timersStore().timers = response.data
    })
  }
}
