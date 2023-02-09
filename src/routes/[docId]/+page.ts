import { error } from '@sveltejs/kit';
import { collection, doc, getDoc, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import type { PageLoad } from './$types';

export const load = (async ({ params }: any) => {
	if (params.docId) {
		const docRef = doc(db, 'Complaint-Registration', params.docId);
		const data = await getDoc(docRef);
		let docData = data.data();
		docData['date'] = docData.date.toDate().toLocaleDateString();
		return {
			docData: docData,
			docId: params.docId
		};
	}

	throw error(404, 'Not found');
}) satisfies PageLoad;
