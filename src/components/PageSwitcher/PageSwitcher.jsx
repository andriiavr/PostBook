import { Page, Pages } from "./PageSwitcher.styled"

export const PageSwitcher = ({pages, base}) => {
    return (
        <Pages>
            {pages.map(p => (
                <Page key={p.text} to={base + p.url} replace>
                    {p.text}
                </Page>
            ))}
        </Pages>
    )
}