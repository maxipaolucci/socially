Parties = new Mongo.Collection('Parties');

if (Meteor.isClient) {
    angular.module('socially', ['angular-meteor']);

    angular.module('socially').directive('partiesList', function () {

        return {
            restrict: 'E',
            templateUrl: 'parties-list.html',
            controllerAs: 'partiesList',
            controller: function ($scope, $reactive) {
                    $reactive(this).attach($scope);
                    this.helpers({
                        parties: () => {
                            return Parties.find({});
                        }
                });
            }
        };

    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Parties.find().count() === 0) {
            var parties = [
                {
                    'name': 'Dubstep-Free Zone',
                    'description': 'Fast just got faster with Nexus S.'
                },
                {
                    'name': 'All dubstep all the time',
                    'description': 'Get it on!'
                },
                {
                    'name': 'Savage lounging',
                    'description': 'Leisure suit required. And only fiercest manners.'
                }
            ];

            for (var i = 0; i < parties.length; i++) {
                Parties.insert(parties[i]);
            }
        }
    });
}