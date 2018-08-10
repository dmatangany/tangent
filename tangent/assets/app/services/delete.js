app.service('Delete', ['$http', '$window', 'URL', function ($http, $window, URL) {
    this.deleteData = function (uri) {
        var token = JSON.parse($window.sessionStorage.getItem("User")).access_token;

        var request = {

            method: "DELETE",
            url: URL.get() + uri,
            headers:
					{
					    "Authorization": "Bearer " + "qwerty",
					    "Accept": "application/json"
					}
        };
        var promise = $http(request)
		.then(function (response) {
		    return response.data;
		}, function (response) {
		    console.log(response);
		  if (response.status==-1) {
		        notify_network_err("no network available");
		    }
		    else if (response.data.Message) {
		        notify_error(response.data.Message);
		    }
		    else {
		        notify_error(response.status);
                
		    }

            $.LoadingOverlay("hide");
		});

        return promise;
    };

} ]);