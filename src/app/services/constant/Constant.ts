export const Constant={
    API_END_POINT:'https://localhost:7203/api/',
    METHODS:{
        LOGIN_USER:'User/login',
        REGISTER_USER:'User',
        GET_ALL_USERS:'User',
        GET_USER_DETAILS:'User/details',
        SET_USER_ADDRESS:'User/address',

        GET_ALL_PRODUCTS:'Products',
        GET_PRODUCTS_BY_CATEGORY:'Products',
        CREATE_PRODUCT:'Products',
        UPDATE_PRODUCT:'Products',
        DELETE_PRODUCT:'Products',
        SEARCH_PRODUCT:'Products',

        GET_ALL_CATEGORY:'Categories',
        CREATE_CATEGORY:'Categories',
        UPDATE_CATEGORY:'Categories',
        DELETE_CATEGORY:'Categories',


        ADD_TO_CART:'Carts/AddItemToCart',
        GET_ALL_CART_ITEMS:'Carts/GetCartItems',
        ADD_ORDER:'Orders/AddOrder',
        REMOVE_ITEM:'Carts/RemoveItem',
        UPDATE_ITEM_QUANTITY:'Carts/UpdateItem',
        EMPTY_CART:'Carts/EmptyCart',

        ADD_ORDER_ITEMS:'Order_Items',
        GET_ORDER_ITEMS_BY_ID:'Order_Items',
        GET_ALL_ORDERS:'Orders/AllOrders',
        GET_MY_ORDERS:'Order_Items/MyOrders',
        UPDATE_ORDER_STATUS:'Orders/UpdateStatus',
        GET_ORDER_STATUS:'Orders/getStatus'


    }
}