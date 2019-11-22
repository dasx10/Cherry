export default function ({store,redirect}){
  if(localStorage.token){store.commit('Users/controlToken')}
  if(!store.state['Users'].user.token){return redirect('/sign')}
}