import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const mockInvoices = [
    { id: 1, date: '2024-01-15', amount: 150.00, status: 'Pagada' },
    { id: 2, date: '2024-01-20', amount: 275.50, status: 'Pendiente' },
    { id: 3, date: '2024-01-25', amount: 420.75, status: 'Pagada' },
];

const Invoices: React.FC = () => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Facturas
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell align="right">Monto</TableCell>
                            <TableCell>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockInvoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell>{invoice.id}</TableCell>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell align="right">${invoice.amount.toFixed(2)}</TableCell>
                                <TableCell>{invoice.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Invoices;
