'use client'
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { reset } from '@/store/slices/progressSlice';

const ResetProgress = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

	return null;
};

export default ResetProgress;
