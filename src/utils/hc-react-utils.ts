import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function hcShowError(
  originator: string,
  message: string,
  error_: unknown
): void {
  if (error_ instanceof AxiosError) {
    toast.error(`${message} : ${error_.message}`);
    console.error('hrl-axios', originator, message, error_);
  } else if (error_ instanceof Error) {
    toast.error(`${message} : ${error_.message}`);
    console.error('hrl-err:', originator, message, error_);
  } else {
    toast.error(`${message} : Unknown error`);
    console.error('hrl-unk:', originator, message, error_);
  }
}
