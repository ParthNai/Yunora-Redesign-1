export default function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground text-xs md:text-sm font-medium h-8 md:h-10 flex items-center overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block">
        <span className="mx-4 md:mx-8">Free Shipping on Orders Above ₹999</span>
        <span className="mx-4 md:mx-8">Exclusive Festive Collection — Now Available</span>
        <span className="mx-4 md:mx-8">Up to 40% Off on Selected Products</span>
        <span className="mx-4 md:mx-8">Premium Quality • Secure Payments • Easy Returns</span>
        <span className="mx-4 md:mx-8">Free Shipping on Orders Above ₹999</span>
        <span className="mx-4 md:mx-8">Exclusive Festive Collection — Now Available</span>
        <span className="mx-4 md:mx-8">Up to 40% Off on Selected Products</span>
        <span className="mx-4 md:mx-8">Premium Quality • Secure Payments • Easy Returns</span>
      </div>
    </div>
  );
}
