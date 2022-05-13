import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [Bill, SetBill] = useState(0);
    const [Tip, SetTip] = useState(0);
    const [CustomTip, SetCustomTip] = useState(false);
    const [People, SetPeople] = useState(0);

    const [TipPerPerson, SetTipPerPerson] = useState(0);
    const [BillPerPerson, SetBillPerPerson] = useState(0);

    useEffect(() => {
        if(isNaN(Bill)) {
            HandleReset()
            return;
        }

        if(isNaN(People)) {
            HandleReset()
            return;
        }

        if( Bill === 0 || People === 0 ) {
            return;
        }

        SetBillPerPerson(Bill / People);
    }, [Bill, People]);

    useEffect(() => {
        if(isNaN(People)) {
            HandleReset()
            return;
        }

        if( Tip === 0 || People === 0 ) {
            return;
        }

        SetTipPerPerson((Bill * (Tip / 100)) / People);
    }, [Tip, People]);

    function HandleCustomTip(percent) {
        if(!isNaN(percent)) {
            SetTip(percent);
            SetCustomTip(true);
        }
    }

    function HandleReset() {
        SetBill(0);
        SetTip(0);
        SetCustomTip(false);
        SetPeople(0);

        SetTipPerPerson(0);
        SetBillPerPerson(0);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Rachaê</title>
                <meta name="description" content="Um simples divisor de contas" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.boxLogo}>
                <span>RA</span>
                <span>CH</span>
                <span>AÊ</span>
            </div>

            <div className={styles.boxCalculator}>
                <div className={styles.boxInfos}>
                    <span>
                        Conta
                    </span>

                    <input type="text" value={Bill > 0 ? Bill : ''} onChange={ e => SetBill(e.target.value) } />

                    <span>
                        Gorjeta (%)
                    </span>

                    <div className={styles.boxTips}>
                        <button onClick={() => SetTip(5)}>5%</button>
                        <button onClick={() => SetTip(10)}>10%</button>
                        <button onClick={() => SetTip(15)}>15%</button>
                        <button onClick={() => SetTip(20)}>20%</button>
                        <button onClick={() => SetTip(25)}>25%</button>
                        <input type="text" placeholder='CUSTOM' value={Tip > 0 && CustomTip ? Tip : ''} onChange={ e => HandleCustomTip(e.target.value) } />
                    </div>

                    <span>
                        Número de Pessoas
                    </span>

                    <input type="text" value={People > 0 ? People : ''} onChange={ e => SetPeople(e.target.value) } />
                </div>

                <div className={styles.boxResults}>
                    <div className={styles.boxResultsInfos}>
                        <div className={styles.boxDescription}>
                            <span>Gorjeta</span>
                            <small>/ pessoa</small>
                        </div>

                        <div className={styles.boxValue}>
                            <span>{Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(TipPerPerson)}</span>
                        </div>
                    
                        <div className={styles.boxDescription}>
                            <span>Conta</span>
                            <small>/ pessoa</small>
                        </div>
                        
                        <div className={styles.boxValue}>
                            <span>{Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(BillPerPerson)}</span>
                        </div>
                    </div>

                    <div>
                        <div className={styles.boxReset}>
                            <button onClick={HandleReset}>reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
