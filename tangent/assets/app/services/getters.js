app.service('URL',[function(){
	this.get =function() {
		return "http://staging.tangent.tngnt.co/";
	}
}]);


app.service('Getter', ['$http', '$window', 'URL', function ($http, $window, URL) {
    this.getData = function (uri) {
        var token = $window.sessionStorage.getItem("User");
		//token = "2a3d1af2f3f6d1cddaa3012c1c465fcbdffa3678";
//alert("token: " + token);
        var config = { headers:
				{ "Authorization": "Token " + token,
				    'content-type': 'application/json'
				}
        }
        var promise = $http.get(URL.get() + uri, config)
		.then(function (response) {
		    return response.data;
		}, function (response) {
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