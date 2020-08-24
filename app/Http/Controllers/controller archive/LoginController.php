<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use League\OAuth2\Client\Provider\GenericProvider;
use App\User;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    private $provider;

    public function __construct()
    {
        $this->provider = new GenericProvider([
            'clientId'                => env('OAUTH_APP_ID'),
            'clientSecret'            => env('OAUTH_APP_SECRET'),
            'redirectUri'             => env('OAUTH_REDIRECT_URI'),
            'urlAuthorize'            => env('OAUTH_AUTHORIZE_ENDPOINT'),
            'urlAccessToken'          => env('OAUTH_TOKEN_ENDPOINT'),
            'scopes'                  => env('OAUTH_SCOPES'),
            'urlResourceOwnerDetails' => '',
        ]);
    }

    public function login()
    {
        $this->provider->authorize();
    }
	
	public function logout()
    {
		Auth::guard('dashboard')->logout();
		return redirect('/'); 	
    }

    public function callback(Request $request)
    {
        $request->validate(['code' => ['required', 'alpha_dash']]);

        try
        {
            $code  = $request->input('code');
            $token = $this->provider->getAccessToken('authorization_code', ['code' => $code]);

			//changed to get unique facebook user id
            $request  = $this->provider->getAuthenticatedRequest('GET', 'https://graph.facebook.com/v6.0/me?fields=name,picture,id', $token);
            $contents = $this->provider->getParsedResponse($request);


			//checks if user exists, if they do logs in and redirects	
			$users = User::all();

			if($users != null) {
				foreach ($users as $user) {
					if($contents['id'] == $users[0]->user_id) {
						Auth::guard('dashboard')->login($user);
						return redirect('dashboard'); 
					}	
				}
			}
			
			//creates new user, fills in required fields, creates entry in users database
			$time = now();
			$id = $contents['id'];
			$name =  $contents['name'];
			$picture =  $contents['picture']['data']['url'];
			$user = new User();
			$user->setAttribute('name', $name);
			$user->setAttribute('picture', $picture);
			$user->setAttribute('user_id', $id);
			$user->setAttribute('updated_at', $time);
			$user->setAttribute('created_at', $time);
			Auth::guard('dashboard')->login($user, true);
			return redirect('dashboard'); 		
			
        }
        catch (\Exception $e)
        {
            error_log($e->getMessage());
            return view('error', ['message' => 'Sorry, we were unable to authenticate you at this time.']);
        }
    }
}
