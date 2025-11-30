export default function MapSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Visit My Office
          </h2>
          <p className="text-xl text-body max-w-3xl mx-auto mb-4">
            Conveniently located in Torrance, my office provides a comfortable and 
            professional environment for your consultation.
          </p>
          <a 
            href="https://www.google.com/maps/place/21250+Hawthorne+Blvd,+Torrance,+CA+90503/@33.8361803,-118.353406,18.81z/data=!4m6!3m5!1s0x80c2b4d35aa9c9b3:0x9718c991148def10!8m2!3d33.8361935!4d-118.3526581!16s%2Fg%2F11bw3fbbpr?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-primary hover:text-primary-hover transition-colors hover:underline inline-block"
          >
            21250 Hawthorne Blvd, Suite 500, Torrance, CA 90503
          </a>
        </div>
        

        <div className="rounded-lg overflow-hidden shadow-lg h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.0741686115725!2d-118.35752901472449!3d33.836197860121175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b4d35aa9c9b3%3A0x9718c991148def10!2s21250%20Hawthorne%20Blvd%2C%20Torrance%2C%20CA%2090503!5e0!3m2!1sen!2sus!4v1764539776078!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Anna M Schneider Law Office Location"
          />
        </div>
      </div>
    </section>
  );
}

