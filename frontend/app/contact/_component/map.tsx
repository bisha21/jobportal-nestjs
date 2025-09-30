export function ContactMap() {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div style={{ width: '100%' }}>
          <iframe
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=pokhara,malepatan+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          />
        </div>

        {/* Partner Logos */}
        <div className="mt-12 flex justify-center items-center space-x-8 opacity-60">
          <div className="text-2xl font-bold text-muted-foreground">zoom</div>
          <div className="text-2xl font-bold text-muted-foreground">finder</div>
          <div className="text-2xl font-bold text-muted-foreground italic">
            Airbnb
          </div>
          <div className="text-2xl font-bold text-muted-foreground">asana</div>
        </div>
      </div>
    </section>
  );
}
