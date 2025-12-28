import { useEffect, useRef } from 'react';

type MyInputProps = {
    label: string;
    // Em React 19, o `ref` chega como prop ao componente de função
    ref: React.Ref<HTMLInputElement>;
};

function MyInput({ label, ref }: MyInputProps) {
    return (
        <label style={{ display: 'block', marginTop: '0.5rem' }}>
            {label}
            <input
                ref={ref}
                style={{
                    marginLeft: '0.5rem',
                    padding: '0.3rem 0.5rem',
                    borderRadius: 4,
                    border: '1px solid #aaa',
                }}
            />
        </label>
    );
}

export function FocusInputDemo() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <section style={{ marginTop: '2rem' }}>
            <h2>Exemplo de ref como prop em função</h2>
            <p style={{ fontSize: '0.9rem' }}>
                Ao montar este componente, o input abaixo recebe foco automaticamente
                usando <code>ref</code> como prop num componente de função.
            </p>

            <MyInput label="Pesquisar tarefa:" ref={inputRef} />
        </section>
    );
}
