import * as React from 'react';
import { registerHandlebarsHelpers } from "components/MailMerge/MailMergeHelpers";
import { useContext } from 'react';

// export default function useHandlebars() {
//   useMountEffect(() =>{
//     registerHandlebarsHelpers();
//   });
// }
export interface HandlebarHelpers{

}
export const HandlebarHelperContext = React.createContext({} );
let helpers: void | null = registerHandlebarsHelpers(); 



export function useHandlebars() {
  const handlebarHelpers = useContext(HandlebarHelperContext);
  return handlebarHelpers;
}
export default useHandlebars;