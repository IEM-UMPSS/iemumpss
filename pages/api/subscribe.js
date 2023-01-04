
import { google } from "googleapis";

export default function handler(req, res) {
    
    if (req.method !== 'POST') {
        return res.status(405).send({message: 'Only POST requests are allowed'})
    }

    const client = new google.auth.JWT(
        process.env.GCP_CLIENT_EMAIL, 
        null, 
        process.env.GCP_PVT_KEY,
        ['https://www.googleapis.com/auth/spreadsheets']
    );

    const body = req.body 

    client.authorize(async function(err, tokens) {
        if (err) {
            return res.status(400).send(JSON.stringify({error: true}));
        }

        const gsapi = google.sheets({version:'v4', auth: client});

        //CUSTOMIZATION FROM HERE
        // const opt = {
        //     spreadsheetId: process.env.SHEET_ID,
        //     range: 'events'
        // };

        const response = await gsapi.spreadsheets.values.append({
            spreadsheetId: process.env.SHEET_ID,
            range: 'subscribe',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [body.email]
                ]
            }
        });
        console.log(response);

        // return res.status(400).send(JSON.stringify({error: false, data: data.data.values}));
        
        
       return res.status(200).json({data: response.data})
        
    });
}
  