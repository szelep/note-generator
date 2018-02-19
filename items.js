l_menu = [
	{
		title: 'Internet',
		resp: [
				{
					method: 'text',
					note: 'C_SPD',
					name: 'Current client speed (mbit/s)',
					post: 'mbit/s',
					required: true,
				},
				{
					method: 'text',
					note: 'C_WN',
					name: 'Client want (mbit/s)',
					post: 'mbit/s',
					required: true
				
				},
				{
					method: 'checkbox',
					note: 'N_PROMO',
					name: 'Offered new promo?'
				
				},
				{
					method: 'select',
					note: 'C_MODEM',
					name: 'Client modem',
					options: ['','Modecom','TP-Link'],
					required: true
				
				},
				{
					method: 'default_text',
					default_message : 'NO_INFO',
					post: 'PLN',
					name: 'Price (type ? when no info)',
					note: 'Price'
				},			
				{
					name: 'Service end date',
					note: 'SERV_END_DATE',
					method: 'datepicker'
				}				
			]
	},
	
	{
		title: 'Client resignation all services',
		resp : [
				{
					note: 'CL_RES_ALL_SERV',
					method: 'quick',
					post: 'YES'
				},
				{
					name: 'Client username',
					note: 'CL_LOGIN',
					method: 'text',
				},			
				{
					name: 'Resignation date',
					note: 'CL_RES_ALL_SERV_DATE',
					method: 'datepicker'
				}	
		]
	}
	
]