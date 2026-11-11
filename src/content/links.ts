/**
 * Dış bağlantılar tek yerde.
 *
 * Adresi boş bırakılan bağlantılar tıklanabilir olarak render EDİLMEZ —
 * href'siz bir <a> klavyeyle odaklanılamaz ve tıklayınca hiçbir şey yapmaz,
 * yani kullanıcıya yalan söyler. Adresi girdiğinizde otomatik olarak
 * gerçek bir link haline gelirler.
 */

export type ExternalLink = {
  label: string;
  url?: string;
};

export const socialLinks: ExternalLink[] = [
  { label: "Instagram", url: "https://www.instagram.com/bangbulbajans/" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/bangbulb-reklam-ajans%C4%B1/",
  },
  { label: "YouTube", url: "https://www.youtube.com/@bangbulbajans7039" },
];

/** Works bölümündeki "arşivi aç" bağlantısı — ör. Behance profili. */
export const archiveUrl: string = "";
