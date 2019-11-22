export default function ({store,redirect}){
    if(localStorage.role){store.commit('Users/controlToken')}
    if(store.state['Users'].user.role!=1){store.commit('Users/Logout')}
}