export interface ClassicRoseVariantConfig {
    assets: {
        background: string;
        backgroundDesktop: string;
        flower: string;
        photoFrame: string;
        bismillah: string;
        divider: string;
        eventFrame: string;
    };
    colors: {
        primary: string;
        text: string;
    };
}

/**
 * Mendefinisikan struktur lengkap untuk konfigurasi tema Classic Rose.
 * Strukturnya disederhanakan karena semua aset sudah masuk variant.
 */
export interface ClassicRoseThemeConfig extends ClassicRoseVariantConfig {
    fonts: {
        heading: string;
        body: string;
        script: string;
    };
}

// Daftar varian warna yang valid dan palet warnanya
const validVariants = {
    red: { primary: '#630718', text: '#630718' },
    green: { primary: '#7B9557', text: '#7B9557' },
    blue: { primary: '#5D84B0', text: '#5D84B0' },
    orange: { primary: '#C86F30', text: '#C86F30' },
    black: { primary: '#D9AD65', text: '#D9AD65' },
    white: { primary: '#A57C4E', text: '#A57C4E' },
};

/**
 * Fungsi untuk mendapatkan konfigurasi tema "Classic Rose" berdasarkan varian warna.
 * @param variant - Nama varian warna (e.g., 'red', 'green', 'blue').
 * @returns Object konfigurasi tema yang lengkap.
 */
export function getClassicRoseThemeConfig(variant: string): ClassicRoseThemeConfig {
    const variantKey = Object.keys(validVariants).includes(variant) ? variant : 'red';
    const colors = validVariants[variantKey as keyof typeof validVariants];

    // Konfigurasi spesifik untuk setiap varian
    const variantConfig: ClassicRoseVariantConfig = {
        assets: {
            background: `/images/themes/classic-rose/${variantKey}/bg.png`,
            backgroundDesktop: `/images/themes/classic-rose/${variantKey}/bg-desktop.png`,
            flower: `/images/themes/classic-rose/${variantKey}/bunga.png`,
            photoFrame: `/images/themes/classic-rose/${variantKey}/border-foto.png`,
            bismillah: `/images/themes/classic-rose/${variantKey}/bismillah.png`,
            divider: `/images/themes/classic-rose/${variantKey}/divider.png`,
            eventFrame: `/images/themes/classic-rose/${variantKey}/event-frame.png`,
        },
        colors: colors,
    };

    // Menggabungkan konfigurasi varian dengan font
    return {
        ...variantConfig,
        fonts: {
            heading: 'var(--font-playfair)',
            body: 'var(--font-alice)',
            script: 'var(--font-alex-brush)',
        },
    };
}
