import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

type Complaints = {
	problemName: string;
	wardName: string;
	status: string;
	date: string;
};

export default async function getCompletedComplaints(uid: string) {
	let deptId = '';
	let wardId = '';
	const ls: Complaints[] = [];
	const adminQuery = query(collection(db, 'Admin'), where('uid', '==', uid));
	const adminData = await getDocs(adminQuery);
	adminData.docs.forEach((data) => {
		console.log(data.data());
		deptId = data.data().deptId;
		wardId = data.data().wardId;
	});
	const q = query(
		collection(db, 'Complaint-Registration'),
		where('deptId', '==', deptId),
		where('wardId', '==', wardId),
		where('status', '==', 'SOLVED')
	);
	const complaints = await getDocs(q);
	complaints.forEach((doc: any) => {
		console.log(doc.data());

		let data = doc.data();
		let date = data.date.toDate();
		data['date'] = date.toLocaleDateString();
		data['docId'] = doc.id;
		ls.push(data);
	});
	return ls;
}
