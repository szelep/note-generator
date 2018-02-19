# What is this?
This is a short way to draw notes (used in another applications).

jQuery required - imported from CDN.

Datapicker (https://github.com/fengyuanchen/datepicker)

Imagine you have to make 100 these notes per day.

>C_SPD: 654 mbit/s;

>C_WN: 45 mbit/s;

>N_PROMO: NO;

>C_MODEM: Modecom;

>Price: NO_INFO;

>SERV_END_DATE: 02/19/2018;

> +10 rows


* Auto copy to clipboard
* Auto focus to inputs (required too)


## Sample


```
{
	title: 'Internet',
		resp: [
				{
					method: 'text',
					note: 'C_SPD',
					name: 'Current client speed (mbit/s)',
					post: 'mbit/s',
					required: true,
				}
}
```
This will return in note:
```
C_SPD: *NUMBER* mbit/s;
```

## Objects properties
	title - Display in main select #reason
	
#### resp.method
	
	text - input text type
	checkbox - input checkbox type, return YES/NO
	select - select type
	default_text - input text type - typing '?' will return default_message in note
	quick - immediately returns predefined note+post
	datepicker - datepicker
	
#### note

This is short code or message displayed as key in generated note
Default separator is ': ' defined in `sepWord`

#### name

Title for every input method - human readable.

#### post

Single row suffix, ex. you can add currency to inserted number.

#### required

If true, note can not be generated without form complete.

#### options ( select method )
Append <option> to select.
If one of elements in array is blank - note can be generated without it.
ex.
```
	options: ['','Modecom','TP-Link',D-link']
```

#### default_message ( default_text method )

Will add this text if someone type '?' in that input (as i mentioned before).

