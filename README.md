# 5m1e_deployment"# 5m1eWebApp" 
1. Create .env in next-app by using env.example as reference
2. Modify value of NEXT_PUBLIC_API_URL from http://localhost/api to http://{SERVER_IP_ADDRESS}/api
3. Create .env in fastapi-app by using env.example as reference
4. Modify value 
  4.1 PG_XXX to information of your postgresql connection 
  4.2 EMAIL_HOST to email smtp server ip address 
  4.3 EMAIL_PORT to email smtp server port 
  4.4 EMAIL_USERNAME and EMAIL_PSSWORD to "", if your smtp server has no authentication 
  4.5 FRONTEND_BASE_URL from http://localhost to http://{SERVER_IP_ADDRESS} <= Please don't put / at the end
5. At the root directory, run 
  5.1 docker-compose build <= This command takes time to complete depending on your internet connection 
  5.2 docker-compose up <= This command will run server and show logs. You can press CTRL+C to quit, or 
  5.3 docker-compose up -d <= This command will run server without displaying the logs
