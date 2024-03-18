# Storybook
Storybook to narzędzie, które pozwala na tworzenie i prezentację komponentów w izolacji od reszty aplikacji.
Dzięki temu możliwe jest testowanie i prezentacja komponentów w różnych stanach,
co znacznie ułatwia pracę nad interfejsem aplikacji.

## Instalacja i uruchomienie
Zasadniczo po zainstalowaniu dependencji w projekcie powinno wystarczyć samo uruchomienie Storybooka.
```bash
npm run storybook
```

## Struktura
Obok plików z komponentami, w projekcie znajdują się pliki Storybooka.
Powiedzmy, że mamy komponent `Button`, to w katalogu `src/components/Button` znajduje się plik `Button.stories.tsx`,
który zawiera przykłady użycia komponentu `Button`.

Analogicznie robimy dla pełnych feature'ów, które chcemy pokazać w Storybooku.

## Przykład
```tsx
import { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'Components/Elements/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
};
```

Exportujemy obiekt `meta` z metadanymi komponentu, a także przykładowe przypadki użycia komponentów.