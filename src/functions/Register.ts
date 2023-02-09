import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default async function Login(
	uid: string,
	name: string,
	address: string,
	email: string,
	aadhar: string,
	age: string,
	ward: string,
	department: string
) {
	try {
		const docRef = await addDoc(collection(db, 'Admin'), {
			name: name,
			address: address,
			email: email,
			aadhar: aadhar,
			age: age,
			wardId: ward,
			deptId: department,
			uid: uid
		});
		console.log('Document written with ID: ', docRef.id);
	} catch (error) {
		console.error('Error adding document: ', error);
	}
}
