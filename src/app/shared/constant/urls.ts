const BASE_URL = 'http://localhost:3000'; // localy ok 30/12/2025
// const BASE_URL = 'https://etokisana-back.onrender.com' // pre prod Render server
// const BASE_URL = 'https://noisy-fayre-dandry-0b996820.koyeb.app' // pre prod on Koyeb server
// const BASE_URL = 'https://backend.commercegestion.com'; // prod
// const BASE_URL = 'https://etokisanabackend.onrender.com';
// const BASE_URL = 'https://ids.creation-sen.mg'; // prod v2

export const PRODUCT_URL                                    = BASE_URL + '/api/product/';
export const PRODUCT_BY_ID_URL                              = PRODUCT_URL + 'id/';
export const PRODUCT_ADD_URL                                = PRODUCT_URL + 'add/';
export const PRODUCT_UPDATE_URL                             = PRODUCT_URL + 'update/';
export const PRODUCT_REMOVE_URL                             = PRODUCT_URL + 'delete/';
export const PRODUCT_BY_OWNER_URL                           = PRODUCT_URL + 'owner/';
export const PRODUCT_BY_SEARCH_URL                          = PRODUCT_URL + 'search/';
export const PRODUCT_UPLOAD_IMAGE_URL                       = PRODUCT_URL + 'upload/';
export const PRODUCT_BY_CATEGORY_URL                        = PRODUCT_URL + 'category/';
export const PRODUCT_BY_REFERENCE_URL                       = PRODUCT_URL + 'reference/';
export const PRODUCT_BY_SITE_ID_URL                         = PRODUCT_URL + 'stock/';
export const PRODUCT_ADD_TO_STOCK_URL                       = PRODUCT_URL + 'addStock/';
export const PRODUCT_MODIFY_STOCK_URL                       = PRODUCT_URL + 'modififyStock/';

// export const UPLOAD_IMAGE_URL                               = PRODUCT_URL + 'upload-image/';
export const UPLOAD_IMAGE_URL                               = BASE_URL + '/api/upload/image/';

export const DEPOTITEM_URL                                  = BASE_URL + '/api/depotItem/';
export const DEPOTITEM_BY_ID_URL                            = DEPOTITEM_URL + 'id/';
export const DEPOTITEM_BY_CATEGORY_URL                      = DEPOTITEM_URL + 'category/';
export const DEPOTITEM_ADD_DEPOT_ITEM_URL                   = DEPOTITEM_URL + 'add/';
export const DEPOTITEM_MODIFY_DEPOT_ITEM_URL                = DEPOTITEM_URL + 'update/';
export const DEPOTITEM_DELETE_DEPOT_ITEM_BY_PRODCUT_ID_URL  = DEPOTITEM_URL + 'deleteByProductId/';
export const DEPOTITEM_DELETE_DEPOT_ITEM_URL                = DEPOTITEM_URL + 'delete/';
export const DEPOTITEM_BY_PRODUCT_ID_URL                    = DEPOTITEM_URL + 'ByProductId/'
export const DEPOTITEM_GET_STOCK_URL                        = DEPOTITEM_URL + 'getStock/'
export const DEPOT_ITEM_WITH_PRODUCT_INFO_URL               = DEPOTITEM_URL + 'productinfos/'


export const NOTIFICATION_URL                   = BASE_URL + '/api/notification/';
export const NOTIFICATION_BY_ID_URL             = NOTIFICATION_URL + 'id/';
export const NOTIFICATION_ADD_URL               = NOTIFICATION_URL + 'add/';
export const NOTIFICATION_UPDATE_URL            = NOTIFICATION_URL + 'update/';
export const NOTIFICATION_REMOVE_URL            = NOTIFICATION_URL + 'delete/';
export const NOTIFICATION_BY_OWNER_URL          = NOTIFICATION_URL + 'userId/';
export const NOTIFICATION_NEW_URL               = NOTIFICATION_URL + 'new/';


export const SITE_URL                      = BASE_URL + '/api/site/';
export const SITE_BY_ID_URL                = SITE_URL + '/';
export const SITE_BY_USERID_URL            = SITE_URL + 'user/';
export const SITE_ADD_URL                  = SITE_URL + 'add';
export const SITE_UPDATE_URL               = SITE_URL + 'update/';
export const SITE_REMOVE_URL               = SITE_URL + 'delete/';

export const TRANSACTION_URL               = BASE_URL + '/api/transaction/';
export const TRANSACTION_BY_ID_URL         = TRANSACTION_URL + 'id/';
export const TRANSACTION_BY_USERID_URL     = TRANSACTION_URL + 'user/';
export const TRANSACTION_ADD_URL           = TRANSACTION_URL + 'add';
export const TRANSACTION_UPDATE_URL        = TRANSACTION_URL + 'update/';
export const TRANSACTION_REMOVE_URL        = TRANSACTION_URL + 'delete/';

export const CATEGORY_URL                  = BASE_URL +'/api/category/';
export const CATEGORY_ADD_URL              = CATEGORY_URL + 'add';
export const CATEGORY_UPDATE_URL           = CATEGORY_URL + 'update/';
export const CATEGORY_REMOVE_URL           = CATEGORY_URL + 'remove/';

export const POINTDEVENTE_URL               = BASE_URL + '/api/pointDeVente/';
export const POINTDEVENTE_UPDATE_URL        = POINTDEVENTE_URL + 'update';

export const FACTURE_VENTE_URL              = BASE_URL + '/api/facture-ventes/';
export const FACTURE_VENTE_ADD_URL          = FACTURE_VENTE_URL + 'create';
export const FACTURE_VENTE_UPDATE_URL       = FACTURE_VENTE_URL + 'update';

export const FACTURE_VENTE_DETAILS_URL      = BASE_URL + '/api/facture-vente-details/';
export const FACTURE_VENTE_DETAILS_ADD_URL  = FACTURE_VENTE_DETAILS_URL + 'create' ;

export const USER_URL                       = BASE_URL + '/api/users/';
export const USER_BY_ID_URL                 = USER_URL + 'id/';
export const USER_BY_USER_ID_URL            = USER_URL + 'userId/';
export const USER_NEW_URL                   = USER_URL + 'new';
export const USER_DELETE_URL                = USER_URL + 'delete/';
export const USER_BY_EMAIL_URL              = USER_URL + 'email/';
export const USER_UPDATE_URL                = USER_URL + 'update/';
export const USER_VALIDATE_URL              = USER_URL + 'validate/';
export const USER_LOGIN_URL                 = USER_URL + 'login';
export const USER_REGISTER_URL              = USER_URL + 'register';
export const USER_UPLOAD_PDP_URL            = USER_URL + 'uploads';
export const USER_GET_PDP_URL               = USER_URL + 'pdp';
export const RESET_TABLES_URL               = USER_URL + 'resetTable';
export const USER_RESETPASSWORD_URL         = USER_URL + 'passwordReset';
export const USER_REQUESTRESETPASSWORD_URL  = USER_URL + 'requestResetPwd';
export const USER_EMAIL_CONFIRMATION_URL    = USER_URL + 'user-confirmation/';
export const USER_TOKEN_VERIFICATION_URL    = USER_URL + 'token/';

export const CORPORATE_URL                       = BASE_URL + '/api/corporate/';
export const CORPORATE_BY_ID_URL                 = CORPORATE_URL + 'id/';
export const CORPORATE_BY_USER_ID_URL            = CORPORATE_URL + 'userId/';
export const CORPORATE_NEW_URL                   = CORPORATE_URL + 'new';
export const CORPORATE_DELETE_URL                = CORPORATE_URL + 'delete/';
export const CORPORATE_BY_EMAIL_URL              = CORPORATE_URL + 'email/';
export const CORPORATE_UPDATE_URL                = CORPORATE_URL + 'update/';
export const CORPORATE_VALIDATE_URL              = CORPORATE_URL + 'validate/';
export const CORPORATE_LOGIN_URL                 = CORPORATE_URL + 'login/';
export const CORPORATE_REGISTER_URL              = CORPORATE_URL + 'register';
export const CORPORATE_UPLOAD_LOGO_URL            = CORPORATE_URL + 'uploads';
export const CORPORATE_GET_LOGO_URL              = CORPORATE_URL + 'logo';
export const CORPORATE_RESETPASSWORD_URL         = CORPORATE_URL + 'passwordReset';
export const CORPORATE_REQUESTRESETPASSWORD_URL  = CORPORATE_URL + 'requestResetPwd';
export const CORPORATE_EMAIL_CONFIRMATION_URL    = CORPORATE_URL + 'corporate-confirmation/';
export const CORPORATE_TOKEN_VERIFICATION_URL    = CORPORATE_URL + 'corporateToken/';

export const BON_ENTREE_URL                 = BASE_URL + '/api/bon-entrees/';
export const BON_ENTREE_ADD_URL             = BON_ENTREE_URL + 'create';

export const BON_ENTREE_DETAILS_URL         = BASE_URL + '/api/bon-entrees-details/'
export const BON_ENTREE_DETAILS_ADD_URL     = BON_ENTREE_DETAILS_URL + 'create';

export const BON_SORTIE_URL                 = BASE_URL + '/api/bon-sorties/';
export const BON_SORTIE_ADD_URL             = BON_SORTIE_URL + 'create';

export const BON_SORTIE_DETAILS_URL         = BASE_URL + '/api/bon-sorties-details/';
export const BON_SORTIE_DETAILS_ADD_URL     = BON_SORTIE_DETAILS_URL + 'create';

export const INVENTAIRE_URL                 = BASE_URL + '/api/inventaires/';
export const INVENTAIRE_ADD_URL             = INVENTAIRE_URL + 'create';

export const INVENTAIRE_DETAILS_URL         = BASE_URL + '/api/inventaireDetails/';
export const INVENTAIRE_DETAILS_SEARCH_URL  = BASE_URL + 'search/';
export const INVENTAIRE_DETAILS_ADD_URL     = INVENTAIRE_DETAILS_URL + 'create';

export const MOUVEMENTSTOCK_URL             = BASE_URL + '/api/mouvementStock/';
export const MOUVEMENTSTOCK_ADD_URL         = MOUVEMENTSTOCK_URL + 'create';
export const MOUVEMENTSTOCK_ADD_ARRAY_URL   = MOUVEMENTSTOCK_URL + 'createArray';

export const CLIENTS_URL                    = BASE_URL + '/api/clients/';
export const CLIENTS_BY_CODE_URL            = CLIENTS_URL + 'codeClient/';
export const CLIENTS_BY_NAME_URL            = CLIENTS_URL + 'search/';
export const CLIENTS_BY_FAMILLE_URL         = CLIENTS_URL + 'famille/';