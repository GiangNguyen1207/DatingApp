using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Photo>()
            .HasOne(photo => photo.AppUser)
            .WithMany(user => user.Photos);
    }

    public DbSet<AppUser> Users { get; set; }
    public DbSet<Photo> Photos { get; set; }
}