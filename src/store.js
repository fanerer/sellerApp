import data from '../data.json'

export default (Vuex) => {
    return new Vuex.Store({
        state: {
            data: data,
            productArray: [],   // 已选购商品的数组
            totalMoney: 0     // 已选购商品的总价格
        },
        mutations: {
            setProductArray(state, obj){      // 将选购的商品放入或移出购物车
                var index = -1;
                for(var i = 0; i < state.productArray.length; i++){
                    var item = state.productArray[i];
                    if(obj.id==item.id){
                        index = i;
                        break;
                    }
                }
                if(index>=0){
                    if(obj.count<=0){
                        state.productArray.splice(index, 1);
                    }else{
                        state.productArray[index] = obj;
                    }
                }else{
                    state.productArray.push(obj);
                }
            },
            mathTotalMoney(state){     // 计算已选购商品的总价格
                var total = 0; 
                for(var i = 0; i < state.productArray.length; i++){
                    var item = state.productArray[i];
                    total += (item.count * item.price);
                }
                state.totalMoney = total;
            },
            clearProduct(state){    // 清空购物车
                state.productArray = [];
            },
            setProductTotal(state, num){   // 清除购物车中的商品时,将总商品的价格归0
                state.totalMoney = num;
            }
        },
        getters: {
            getSellerData(state){
                return state.data.seller
            },
            getGoodsData(state){
                if(state.data){
                    return state.data.goods;
                }
                return {};
            },
            getTotalMoney(state){
                return state.totalMoney;
            },
            getProductById(state, id){
                var innerFun = function(id){   // 根据id获取已选商品
                    for(var i = 0; i < state.productArray.length; i++){
                        var item = state.productArray[i];
                        if(item.id == id){
                            return item;
                        }
                    }
                    return false;
                }
                return innerFun;
            },
            getProductArray(state){
                return state.productArray;
            },
            getRatingsData(state){
                if(state.data){
                    return state.data.ratings
                }
            }
        }
    })
}