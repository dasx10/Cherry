export default {
    setTrans(state,data){
        state.upload = false;
        state.transactions = data;
        for(let i=0;i<state.transactions.length;i++){
            state.transactions[i].date_of_order_creation = new Date(state.transactions[i].date_of_order_creation * 1000);
        }
        state.upload = true;
    }
}