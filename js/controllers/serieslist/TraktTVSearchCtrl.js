DuckieTV.controller('traktTvSearchCtrl', ["$rootScope", "TraktTVv2", "$stateParams", "$state",
    function($rootScope, TraktTVv2, $stateParams, $state) {

        var traktSearch = this;

        this.results = [];
        this.searching = true;
        this.error = false;

        this.search = {
            query: ''
        };


        TraktTVv2.search($stateParams.query).then(function(res) {
            traktSearch.search.query = $stateParams.query;
            traktSearch.error = false;
            traktSearch.searching = false;
            traktSearch.results = res || [];
            $rootScope.$applyAsync();
        }).catch(function(err) {
            console.error("Search error!", err);
            traktSearch.error = err;
            traktSearch.searching = false;
            traktSearch.results = [];
        });

        /**
         * load details side panel only after hovering for half a second
         * this prevents accidental loading if mouse is moving across posters
         */
        this.startHoverTimer = function(serie) {
            this.clearHoverTimer();
            this.hoverTimer = setTimeout(function() {
                $state.go('favorites.add.search.trakt-serie', {
                    id: serie.trakt_id,
                    serie: serie
                });
            }.bind(this), 500);
        };

        this.clearHoverTimer = function() {
            clearTimeout(this.hoverTimer);
        };

        /**
         * When in add mode, ng-mouseenter sets this serie on the scope, so that it can be shown
         * by the seriedetails directive
         * @param {[type]} serie [description]
         */
        this.setHoverSerie = function(serie) {
            //console.log("Hover serie!", serie);
            $state.go('favorites.add.search.trakt-serie', {
                id: serie.trakt_id,
                serie: serie
            });
        };
    }
]);