import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Api тесты для Restful-booker',() =>{

    let bookingid;
    let authToken;
    
    const baseURL = 'https://restful-booker.herokuapp.com';

    const postData = {
        "firstname" : "Jim",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2027-01-01",
            "checkout" : "2027-02-01"
        },
        "additionalneeds" : "Breakfast"
    }

    const putData = {
        "firstname" : "John",
        "lastname" : "Smith",
        "totalprice" : 200,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2027-01-01",
            "checkout" : "2027-02-01"
        },
        "additionalneeds" : "Breakfast"
    }


    test('Создание бронирования @api', async ({ request }) => {

        const response = await request.post(`${baseURL}/booking`, {
            data: postData,
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        bookingid = responseBody.bookingid;

        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody).toMatchObject({
            bookingid: expect.any(Number),
            booking: postData
        }); 
    });

    test('Получение информации о бронировании @api', async ({ request }) => {
        const response = await request.get(`${baseURL}/booking/${bookingid}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
    
        expect(responseBody).toMatchObject(postData); 
    });

    test('Обновление бронирования @api', async ({ request }) => {

        const authResponce = await request.post("https://restful-booker.herokuapp.com/auth", {
            data:{
                "username" : "admin",
                "password" : "password123"
            }
        });
        const authBody = await authResponce.json();
        authToken = authBody.token;

        const response = await request.put(`${baseURL}/booking/${bookingid}`, {
            headers: {
                'Cookie': `token=${authToken}`
            },
            data: putData
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject(putData); 
    });

    test('Удаление бронирования @api', async ({ request }) => {
        const response = await request.delete(`${baseURL}/booking/${bookingid}`,{
            headers: {
                'Cookie': `token=${authToken}`
            }
        });
        expect(response.status()).toBe(201);

        const getResponse = await request.get(`${baseURL}/booking/${bookingid}`);
        expect(getResponse.status()).toBe(404);
    });
});