
function routes($stateProvider, $urlRouterProvider) {
     //$locationProvider.html5Mode(true).hashPrefix(!);
     $urlRouterProvider.otherwise('/home');

     $stateProvider
          .state('home', {
               url: '/home',
               controller: 'auth',
               views: {
                    'accountmenu': {templateUrl: 'views/blank.html'},
                    'content': {templateUrl: 'views/home.html', controller: 'auth'},
                    'home_account@home': {templateUrl: 'views/account_register.html', controller: 'auth'}
               }
          })
          .state('register', {
               url: '/account/register',
               views: {
                    'accountmenu': {templateUrl: 'views/blank.html'},
                    'content': {templateUrl: 'views/home.html', controller: 'auth' },
                    'home_account@register': {templateUrl: 'views/account_register.html', controller: 'auth'}
               },
               controller: 'auth'
          })
          .state('login', {
               url: '/account/login',
               views: {
                    'accountmenu': {templateUrl: 'views/blank.html'},
                    'content': {templateUrl: 'views/home.html' },
                    'home_account@login': {templateUrl: 'views/account_login.html', controller: 'auth'}
               },
               controller: 'auth'
          })
          .state('console', {
               url:'/console',
               templateUrl: 'views/console.html',
               views: {
                    'content': {
                         templateUrl: 'views/console.html',
                         controller: 'console_controller'
                    }
               },
               controller: 'console_controller'
          })
          .state('cms_page', {
               url:'/cms_page/:pageid',
               templateUrl: 'views/cms_page.html',
               views: {
                    'content': {templateUrl: 'views/cms_page.html' }
               },
               controller: 'CmsPage'
          })
          .state('account', {
               url:'/account',
               views: {
                    'accountmenu': {templateUrl: 'views/accountmenu_loggedin.html', controller: 'auth'},
                    'content': {templateUrl: 'views/account.html', controller: 'auth'},
               },
               controller: 'auth'
          })
          .state('node', {
               url:'/node/:id',
               templateUrl: 'views/node.html',
               views: {
                    'content': {templateUrl: 'views/node.html', controller: 'node' }
               }
          })
          .state(':type/new', {
               url:'/:type/new',
               templateUrl: 'views/schema.html',
               views: {
                    'content': {templateUrl: 'views/schema.html', controller: 'schema' }
               }
          })
          .state(':type/list', {
               url:'/:type/list',
               templateUrl: 'views/list.html',
               views: {
                    'content': {templateUrl: 'views/list.html', controller: 'schema' }
               }
          })
          .state(':type/edit/:id', {
               url:'/:type/edit/:id',
               templateUrl: 'views/schema.html',
               views: {
                    'content': {templateUrl: 'views/schema.html', controller: 'schema' }
               }
          })
          //.state('add', {
          //     url:'/add/:id',
          //     templateUrl: 'views/node.html',
          //     views: {
          //          'content': {templateUrl: 'views/node.html', controller: 'node' }
          //     }
          //})
          .state('list', {
               url: '/list',
               templateUrl: 'views/list.html',
               views: {
                    'content': { templateUrl: 'views/list.html', controller: 'List' }
               }
          });
}
